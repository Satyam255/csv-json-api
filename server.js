const express = require("express");
const dotenv = require("dotenv");
const pool = require("./db");
const parseCSVtoJSON = require("./csvParser");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/upload", async (req, res) => {
  try {
    const data = parseCSVtoJSON(process.env.CSV_PATH);

    for (const record of data) {
      const name = record.name.firstName + " " + record.name.lastName;
      const age = parseInt(record.age);
      const address = record.address || {};
      const { name: _, age: __, address: ___, ...rest } = record;
      const additional_info = rest;

      await pool.query(
        "INSERT INTO users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)",
        [name, age, address, additional_info]
      );
    }

    const { rows } = await pool.query("SELECT age FROM users");
    const counts = { "<20": 0, "20-40": 0, "40-60": 0, ">60": 0 };

    for (const { age } of rows) {
      if (age < 20) counts["<20"]++;
      else if (age <= 40) counts["20-40"]++;
      else if (age <= 60) counts["40-60"]++;
      else counts[">60"]++;
    }

    const total = rows.length;
    for (let key in counts)
      counts[key] = ((counts[key] / total) * 100).toFixed(2);

    console.table(counts);
    res.json({ status: "Uploaded Successfully", distribution: counts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

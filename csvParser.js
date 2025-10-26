const fs = require("fs");

function parseCSVtoJSON(filePath) {
  const content = fs.readFileSync(filePath, "utf-8").trim();
  const [headerLine, ...rows] = content.split("\n");
  const headers = headerLine.split(",").map((h) => h.trim());

  const jsonData = rows.map((row) => {
    const values = row.split(",").map((v) => v.trim());
    const obj = {};
    headers.forEach((key, i) => assignNested(obj, key.split("."), values[i]));
    return obj;
  });

  return jsonData;
}

function assignNested(obj, keys, value) {
  const lastKey = keys.pop();
  const deepRef = keys.reduce((acc, key) => {
    if (!acc[key]) acc[key] = {};
    return acc[key];
  }, obj);
  deepRef[lastKey] = value;
}

module.exports = parseCSVtoJSON;

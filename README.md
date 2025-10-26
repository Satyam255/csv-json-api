
# CSV to JSON Converter API (Kelp Global Coding Challenge)

This project is a **Node.js (Express)** application that converts a **CSV file** into **JSON objects**, stores them in a **PostgreSQL database**, and prints the **age group distribution** report to the console.


## Objective

* Parse a CSV file manually (no external CSV-to-JSON libraries).
* Convert each record into a JSON object with nested properties.
* Insert parsed data into a PostgreSQL table.
* Compute and display age group percentage distribution.

---

## Tech Stack

* **Node.js** (v20+)
* **Express.js**
* **PostgreSQL**
* **dotenv**

---

## Project Structure

```
csv-json-api/
│
├── data/
│   └── users.csv              # Sample CSV file
│
├── db.js                      # PostgreSQL connection setup
├── csvParser.js               # Custom CSV → JSON converter
├── server.js                  # Express app + main logic
├── .env                       # Environment variables
└── README.md
```

---

## ⚙️ Environment Setup

### 1️⃣ Install Dependencies

```bash
npm install express pg dotenv
```

### 2️⃣ Create a `.env` File

Example:

```env
PORT=5000
CSV_PATH=./data/users.csv
PGHOST=localhost
PGUSER=postgres
PGDATABASE=kelpdb
PGPASSWORD=yourpassword
PGPORT=5432
```

### 3️⃣ Setup PostgreSQL

Open your PostgreSQL terminal or pgAdmin and run:

```sql
CREATE DATABASE kelpdb;

\c kelpdb;

CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  age INT NOT NULL,
  address JSONB,
  additional_info JSONB
);
```

---

## 📄 Sample CSV File

Saved a file as `data/users.csv`:

---

## 🚀 Running the Application

Start the server:

```bash
node server.js
```

Then open your browser or Postman and visit:

```
http://localhost:5000/upload
```

The API will:

* Parse the CSV file manually
* Insert data into PostgreSQL
* Log the age distribution report in your terminal

Example console output:

```
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│   <20   │ '20.00'│
│  20-40  │ '40.00'│
│  40-60  │ '20.00'│
│   >60   │ '20.00'│
└─────────┴────────┘
```

---

## 🧩 API Endpoint

| Method       | Endpoint  | Description                                           |
| ------------ | --------- | ----------------------------------------------------- |
| `GET`        | `/upload` | Parses CSV, stores users, and prints age distribution |

---

## 📊 Age Distribution Calculation

| Age Range | Condition     | Example      |
| --------- | ------------- | ------------ |
| `<20`     | age < 20      | Teen users   |
| `20–40`   | 20 ≤ age ≤ 40 | Young adults |
| `40–60`   | 40 < age ≤ 60 | Middle-aged  |
| `>60`     | age > 60      | Seniors      |

The percentage for each range is calculated as:

```
count_in_range / total_users * 100
```

---

## ⚠️ Notes & Constraints

*  Do **not** use external CSV-to-JSON libraries (e.g., `csvtojson`).
*  Handle nested keys with dot notation (`a.b.c` → `{ a: { b: { c: value } } }`).
*  Optimized for up to **50,000+ records**.
* Uses **JSONB** columns for flexible data storage in PostgreSQL.

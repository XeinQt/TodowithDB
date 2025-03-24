const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
});

app.get("/", (req, res) => {
  return res.json("From backend");
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

//adding or inserting
app.post("/add", (req, res) => {
  const { todo } = req.body;

  const checkSql = "SELECT * FROM todo WHERE todos = ?";
  db.query(checkSql, [todo], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message || "Unknown DB error" });
    }

    if (result.length > 0) {
      return res.status(409).json({ error: "Todo already exists!" }); // ← ✅ Corrected here
    }

    const insertSql = "INSERT INTO todo (todos) VALUES (?)";
    db.query(insertSql, [todo], (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json({ message: "Todo added!" });
    });
  });
});

//reading
app.get("/todos", (req, res) => {
  const sql = "SELECT id, todos FROM todo";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

app.listen(PORT, () => {
  console.log("Listening...");
});

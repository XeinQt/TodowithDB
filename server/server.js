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
  const sql = "INSERT INTO todo (todos) VALUES (?)";
  db.query(sql, [todo], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Todo added!" });
  });
});

app.listen(PORT, () => {
  console.log("Listening...");
});

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const PORT = 4000;

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
});

app.get("/", (req, res) => {
  return res.json("From backend");
});

app.listen(PORT, () => {
  console.log("Listening...");
});

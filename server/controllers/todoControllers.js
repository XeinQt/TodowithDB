const db = require("../config/db");

// Add todo
const addTodo = (req, res) => {
  const { todo } = req.body;

  const checkSql = "SELECT * FROM todo WHERE todos = ?";
  db.query(checkSql, [todo], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length > 0) {
      return res.status(409).json({ error: "Todo already exists!" });
    }

    const insertSql = "INSERT INTO todo (todos) VALUES (?)";
    db.query(insertSql, [todo], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Todo added!" });
    });
  });
};

// Get all todos
const getTodos = (req, res) => {
  db.query("SELECT id, todos FROM todo", (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};

// Delete todo
const deleteTodo = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todo WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Todo deleted successfully!" });
  });
};

// Update todo
const updateTodo = (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  const sql = "UPDATE todo SET todos = ? WHERE id = ?";
  db.query(sql, [todo, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Todo updated successfully!" });
  });
};

module.exports = {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
};

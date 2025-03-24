const express = require("express");
const router = express.Router();
const {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

const validateTodo = require("../middleware/validateTodo");

router.get("/todos", getTodos);
router.post("/add", validateTodo, addTodo);
router.delete("/delete/:id", deleteTodo);
router.put("/update/:id", validateTodo, updateTodo);

module.exports = router;

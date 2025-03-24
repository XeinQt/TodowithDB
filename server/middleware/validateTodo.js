const validateTodo = (req, res, next) => {
  const { todo } = req.body;
  if (!todo || todo.trim() === "") {
    return res.status(400).json({ error: "Todo cannot be empty." });
  }
  next();
};

module.exports = validateTodo;

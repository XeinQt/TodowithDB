import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  //FOR EDITING
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  //handle edit button
  const handleEdit = (items) => {
    setTodo(items.todos);
    setEditing(true);
    setEditId(items.id);
  };

  //handle edit
  const handleUpdateTodo = async () => {
    if (todo.trim() === "") return alert("Please add todo");

    try {
      await axios.put(`http://localhost:4000/update/${editId}`, {
        todo: todo,
      });

      alert("Update successfully!");
      setTodo("");
      setEditing(false);
      setEditId(null);
      fetchTodo();
    } catch (error) {
      console.error("Error in updating todo");
    }
  };

  const handleAddTodo = async () => {
    if (todo.trim() === "") return alert("Please add todo");

    try {
      const response = await axios.post("http://localhost:4000/add", {
        todo: todo,
      });
      setTodo("");
      fetchTodo();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Todo already exists!"); // Handle duplicate
        setTodo("");
      }
      console.error("Error adding todo", error);
    }
  };

  const fetchTodo = async () => {
    try {
      const res = await axios.get("http://localhost:4000/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Failed to fetchTodo", error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${id}`);
      alert("Todo Deleted Sucessfully!");
      setTodo("");
      fetchTodo();
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <div className="bg-amber-200 h-[100vh] flex items-center justify-center">
      <div className="bg-blue-400 rounded-3xl w-2xl">
        <h1 className="text-center text-5xl font-bold mt-5 mb-5">Todo List</h1>
        {/* top div */}
        <div className=" py-3 px-2 rounded-t-3xl">
          <input
            placeholder="Enter todo"
            value={todo || ""}
            onChange={(e) => setTodo(e.target.value)}
            className="bg-white w-3/4 px-2 py-3 focus: outline-none"
            type="text"
          />
          <button
            onClick={editing ? handleUpdateTodo : handleAddTodo}
            className="bg-green-500 w-1/4 px-2 py-3 text-white cursor-pointer"
          >
            {editing ? "Update" : "Add"}
          </button>
        </div>
        {/* bottom div */}
        <div className="bg-red-300 py-5 px-2 rounded-b-3xl">
          {/*reading in database*/}
          {todos.map((items) => {
            return (
              <div key={items.id} className="bg-white flex mb-3">
                <p className="w-3/4 py-3 px-2 ">{items.todos}</p>
                <div className="w-1/4">
                  <button
                    onClick={() => handleEdit(items)}
                    className="py-3 px-2 bg-yellow-300 w-1/2 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(items.id)}
                    className="py-3 px-2 bg-red-400 w-1/2 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          {/*End */}
        </div>
      </div>
    </div>
  );
}

export default App;

import axios from "axios";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://todobackendpy.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  // console.log("data", todos);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  // const notify = () => toast("Wow so easy!");

  // Fetch todos from the backend
  useEffect(() => {
    axios
      .get(`${BASE_URL}/todos`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the todos:", error);
      });
    setLoading(false);
  }, []);

  // Add new todo
  const addTodo = () => {
    if (name.trim() === "" || age.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      name,
      age,
    };

    axios.post(`${BASE_URL}/todos`, newTodo).then((response) => {
      setTodos([response.data, ...todos]);
      setName("");
      setAge("");
    });
    toast.success(" Added successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const startEdit = (id, name, age) => {
    setEditId(id);
    setEditName(name);
    setEditAge(age);
  };

  // Update todo
  const updateTodo = () => {
    if (editName.trim() === "" || editAge.trim() === "") return;

    const updatedTodo = {
      id: editId,
      name: editName,
      age: editAge,
    };

    axios
      .put(`${BASE_URL}/todos/${editId}`, updatedTodo)
      .then((response) => {
        const updatedTodos = todos.map((todo) =>
          todo._id === editId ? response.data : todo
        );
        setTodos(updatedTodos);
        setEditId(null);
        setEditName("");
        setEditAge("");
      })
      .catch((error) => {
        console.error("There was an error updating the todo:", error);
      });
    toast.success(" Updated successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Delete todo
  const deleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      axios
        .delete(`${BASE_URL}/todos/${id}`)
        .then(() => {
          const updatedTodos = todos.filter((todo) => todo._id !== id);
          setTodos(updatedTodos);
        })
        .catch((error) => {
          console.error("There was an error deleting the todo:", error);
        });
      toast.error(" Deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-300 to-blue-300 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Name & Age List
        </h1>

        <div className="flex flex-col gap-2 mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Enter name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            value={age}
            type="number"
            onChange={(e) => setAge(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Enter age"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300">
          {loading ? (
            <div className="flex justify-center">
              <BeatLoader color="#3B82F6" size={15} />
            </div>
          ) : todos.length === 0 ? (
            <p className="text-gray-400 text-center">
              No entries yet. Add one!
            </p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 hover:shadow transition-all"
              >
                {editId === todo._id ? (
                  <>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-1/3 px-2 py-1 mr-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <input
                      type="number"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      className="w-1/4 px-2 py-1 mr-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                      onClick={updateTodo}
                      className="text-green-600 font-semibold cursor-pointer mr-2 hover:font-bold"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="text-gray-400 cursor-pointer hover:text-gray-600 hover:font-bold"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-gray-800 flex-1">
                      <strong>{todo?.name}</strong> — {todo?.age} years old
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(todo._id, todo.name, todo.age)}
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                      >
                        ❌
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;

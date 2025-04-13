import { useState } from "react";

import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../services/todoApi";

const Home = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");

  const { data: todos = [], isLoading, refetch } = useGetTodosQuery();
  //   console.log(data)
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAdd = async () => {
    if (name.trim() === "" || age.trim() === "") return;

    const newTodo = { name, age };
    await addTodo(newTodo);
    toast.success("Added successfully!");
    setName("");
    setAge("");
    refetch();
  };

  const handleUpdate = async () => {
    if (editName.trim() === "" || editAge.trim() === "") return;

    await updateTodo({ id: editId, name: editName, age: editAge });
    toast.success("Updated successfully!");
    setEditId(null);
    setEditName("");
    setEditAge("");
    refetch();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteTodo(id);
      toast.error("Deleted successfully!");
      refetch();
    }
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditName(todo.name);
    setEditAge(todo.age);
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
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Enter name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            value={age}
            type="number"
            onChange={(e) => setAge(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Enter age"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300">
          {isLoading ? (
            <div className="flex justify-center">
              <BeatLoader color="#3B82F6" size={15} />
            </div>
          ) : todos.length === 0 ? (
            <p className="text-gray-400 text-center">
              No entries yet. Add one!
            </p>
          ) : (
            [...todos].reverse().map((todo) => (
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
                      onClick={handleUpdate}
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
                      <strong>{todo.name}</strong> — {todo.age} years old
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(todo)}
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(todo._id)}
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
};

export default Home;

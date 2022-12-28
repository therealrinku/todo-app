import { useContext, useEffect, useState } from "react";
import { FiLogOut, FiPlus, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Todos } from "../components/Todos";
import { RootContext } from "../context/RootContext";
import { getTodos, useAddTodo, useDeleteTodo, useMarkTodoCompleted, useUpdateTodo } from "../queryHooks/todos";

export interface TodosModel {
  title: string;
  id: number;
  status: string;
}

export function Dashboard() {
  const { userEmail, setUserEmail } = useContext(RootContext);
  const [todoTitle, setTodoTitle] = useState<string>("");

  const { data: todos, isLoading: isTodosLoading, remove: removeTodoList, refetch: refetchTodos } = getTodos();

  const addTodo = useAddTodo();
  const markTodoComplete = useMarkTodoCompleted();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const onAdd = () => {
    setTodoTitle("");
    addTodo.mutate({ title: todoTitle });
  };

  const onComplete = (id: number) => markTodoComplete.mutate({ id });

  const onDelete = (id: number) => deleteTodo.mutate({ id });

  const onUpdate = (id: number, newTitle: string) => updateTodo.mutate({ id, newTitle });

  const onLogout = () => {
    setUserEmail(null);
    localStorage.removeItem("accessToken");
    removeTodoList();
  };

  useEffect(() => {
    if (addTodo.isSuccess || updateTodo.isSuccess || markTodoComplete.isSuccess || deleteTodo.isSuccess) {
      refetchTodos();
    }
  }, [addTodo.isSuccess, updateTodo.isSuccess, markTodoComplete.isSuccess, deleteTodo.isSuccess]);

  return (
    <>
      <div className="w-full max-w-md my-10 mx-auto">
        <div className="flex items-center justify-between mb-2 p-2">
          <p className="font-bold text-rose-500 text-lg ">Todo App</p>

          <section className="flex items-center gap-2 text-sm">
            <div className="flex flex-col  items-center gap-0 border py-1 px-2 rounded">
              <span className="flex gap-2">
                <FiUser size={18} />
                <p>{userEmail}</p>
              </span>
              <Link to="/change-password" className="text-sm underline">
                Change Password
              </Link>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 flex items-center gap-2"
            >
              <FiLogOut /> <p>Logout</p>
            </button>
          </section>
        </div>

        <div className="bg-white shadow-md rounded border  px-5 pt-6 pb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Add New Todo
          </label>
          <input
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            className="text-sm shadow  border rounded w-full py-2 px-3 text-gray-700 outline-none"
            id="username"
            type="text"
            placeholder="Writing a book ..."
          />
        </div>

        <button
          disabled={addTodo.isLoading || !todoTitle.trim().length}
          onClick={onAdd}
          className="mt-5 disabled:bg-rose-400 bg-rose-500 text-white rounded p-2 text-sm w-full flex items-center gap-2 justify-center"
        >
          <FiPlus /> Add
        </button>

        <div className="mt-5 text-sm ">
          <h5 className="font-bold">Todos</h5>

          <Todos
            isLoading={
              isTodosLoading ||
              addTodo.isLoading ||
              deleteTodo.isLoading ||
              markTodoComplete.isLoading ||
              updateTodo.isLoading
            }
            todos={todos}
            onEdit={onUpdate}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        </div>
      </div>
    </>
  );
}

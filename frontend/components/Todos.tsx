import { useState } from "react";
import { FiCheck, FiEdit, FiX } from "react-icons/fi";
import { TodosModel } from "../pages/dashboard";
import { EditTodoModal } from "./EditTodoModal";

interface Props {
  todos: TodosModel[];
  onEdit: (id: number, newTitle: string) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  isLoading?: boolean;
}

export function Todos({ todos, onEdit, onDelete, onComplete, isLoading }: Props) {
  const [selected, setSelected] = useState<string>("");
  const [selectedTodo, setSelectedTodo] = useState<TodosModel | null>();

  return (
    <div>
      <div className="tab flex gap-10 my-5 border-0 border-b border-slate-500">
        <button
          onClick={() => setSelected("")}
          className={`${selected === "" && "border-b-4 border-0 border-rose-500"} w-20`}
        >
          All
        </button>
        <button
          onClick={() => setSelected("completed")}
          className={`${selected === "completed" && "border-b-4 border-0 border-rose-500"} w-20`}
        >
          completed
        </button>
        <button
          onClick={() => setSelected("not started")}
          className={`${selected === "not started" && "border-b-4 border-0 border-rose-500"} w-20`}
        >
          not started
        </button>
      </div>
      {todos?.length > 0 ? (
        todos
          ?.filter((todo) => todo.status.includes(selected))
          .map((todo) => {
            return (
              <div className="mt-3 shadow border rounded p-2 flex justify-between items-center" key={todo.id}>
                <span className="flex items-center">
                  <p>{todo.title}</p>
                  <b className={`ml-2 ${todo.status === "completed" ? "text-green-500" : "text-red-500"}`}>
                    {todo.status}
                  </b>
                </span>
                <section className="flex items-center gap-4">
                  {todo.status !== "completed" && (
                    <button
                      disabled={isLoading}
                      onClick={() => setSelectedTodo(todo)}
                      className="disabled:text-gray-500 hover:text-rose-900"
                    >
                      <FiEdit size={16} />
                    </button>
                  )}
                  {todo.status !== "completed" && (
                    <button
                      disabled={isLoading}
                      onClick={() => onComplete(todo.id)}
                      className=" disabled:text-gray-500 hover:text-green-900"
                    >
                      <FiCheck size={18} />
                    </button>
                  )}
                  <button
                    disabled={isLoading}
                    onClick={() => onDelete(todo.id)}
                    className="disabled:text-gray-500 hover:text-red-900"
                  >
                    <FiX size={18} />
                  </button>
                </section>
              </div>
            );
          })
      ) : (
        <p className="text-center mt-10"> {isLoading ? "loading.." : "no any todos"}</p>
      )}

      {selectedTodo && (
        <EditTodoModal
          isLoading={isLoading}
          selectedTodo={selectedTodo}
          onEdit={onEdit}
          onCancel={() => setSelectedTodo(null)}
        />
      )}
    </div>
  );
}

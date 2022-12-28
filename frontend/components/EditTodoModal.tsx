import { FormEvent, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

interface Props {
  selectedTodo: {
    title?: string;
    id?: number;
    status?: string;
  };
  onEdit: Function;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EditTodoModal({ selectedTodo, onEdit, onCancel, isLoading }: Props) {
  const [title, setTitle] = useState(selectedTodo.title || "");

  const onEditFinish = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim().length) {
      return toast.error("Please enter todo title.");
    }

    onEdit(selectedTodo.id, title);
    onCancel();
  };

  return (
    <div tabIndex={1} className="bg-slate-100 fixed top-0 left-0 right-0 z-50 p-4 md:h-full">
      <div className="mx-auto w-full h-full max-w-md">
        <form onSubmit={onEditFinish} className="relative bg-white rounded shadow dark:bg-white-700 text-white p-5">
          <section>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-sm shadow border rounded w-full py-2 px-3 text-gray-700 outline-none "
              id="title"
              type="text"
            />
          </section>
          <button
            disabled={isLoading}
            className="mt-5 disabled:bg-rose-400 bg-rose-500 text-white rounded p-2 text-sm w-full flex items-center gap-2 justify-center"
          >
            <FiCheck /> Update
          </button>
          <button onClick={onCancel} type="button" className="absolute top-2 right-2 text-black ">
            <FiX size={22} />
          </button>
        </form>
      </div>
    </div>
  );
}

import { FormEvent, useEffect, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserPasswordUpdate } from "../queryHooks/auth";

export function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  const passwordChange = useUserPasswordUpdate();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (oldPassword.trim().length < 8 || newPassword.trim().length < 8) {
      return toast.error("Passwords must be 8 characters long minimum.");
    }

    if (newPassword !== newPasswordRepeat) {
      return toast.error("New Passwords didn't matched.");
    }
    passwordChange.mutate({ oldPassword, newPassword });
  };

  useEffect(() => {
    if (passwordChange.isSuccess) {
      navigate("/auth");
    }
  }, [passwordChange.isError, passwordChange.isSuccess]);
  return (
    <div className="w-full max-w-md my-10 mx-auto">
      <h5>Change Password</h5>
      <form onSubmit={onSubmit} className="bg-white mt-5 shadow-md rounded border  px-5 pt-6 pb-8 flex flex-col gap-5">
        <section>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Old Password
          </label>
          <input
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="text-sm shadow  border rounded w-full py-2 px-3 text-gray-700 outline-none "
            id="username"
            type="password"
          />
        </section>

        <section>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            New Password
          </label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="text-sm shadow  border rounded w-full py-2 px-3 text-gray-700 outline-none "
            id="password"
            type="password"
          />
        </section>

        <section>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password Again
          </label>
          <input
            value={newPasswordRepeat}
            onChange={(e) => setNewPasswordRepeat(e.target.value)}
            className="text-sm shadow  border rounded w-full py-2 px-3 text-gray-700 outline-none "
            id="newPassword"
            type="password"
          />
        </section>

        <button
          disabled={passwordChange.isLoading}
          className="mt-5 disabled:bg-rose-400 bg-rose-500 text-white rounded p-2 text-sm w-full flex items-center gap-2 justify-center"
        >
          <FiUserPlus /> Change Password
        </button>
      </form>
    </div>
  );
}

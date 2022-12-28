import { FormEvent, useContext, useEffect, useState } from "react";
import { FiInfo, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { RootContext } from "../context/RootContext";
import { useUserLogin, useUserRegister } from "../queryHooks/auth";

export function Auth() {
  const [loginMode, setLoginMode] = useState(true);
  const { setUserEmail } = useContext(RootContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = useUserRegister();
  const login = useUserLogin();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (loginMode) {
      login.mutate({ email, password });
    } else {
      if (!email.includes("@") || !email.includes(".com") || password.trim().length < 8) {
        //error
        return;
      }
      signup.mutate({ email, password });
    }
  };

  useEffect(() => {
    if (signup.isSuccess) {
      setLoginMode(true);
    }
    if (login.isSuccess) {
      setUserEmail(email);
      navigate("/");
    }
  }, [signup.isSuccess, login.isSuccess]);

  return (
    <div className="w-full max-w-md my-10 mx-auto">
      <h5>{loginMode ? "Login" : "Signup"}</h5>
      <form onSubmit={onSubmit} className="bg-white mt-5 shadow-md rounded border  px-5 pt-6 pb-8 flex flex-col gap-5">
        <section>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm shadow  border rounded w-full py-2 px-3 text-gray-700 outline-none "
            id="username"
            type="text"
          />
        </section>

        <section>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-sm shadow  border rounded w-full py-2 px-3 text-gray-700 outline-none "
            id="password"
            type="password"
          />
        </section>

        {!loginMode && (
          <div>
            <p className="flex gap-1 items-center text-sm">
              <FiInfo />
              <span>Password must be 8 characters long.</span>
            </p>

            <p className="flex gap-1 items-center text-sm">
              <FiInfo />
              <span>Email must be valid.</span>
            </p>
          </div>
        )}

        <button
          disabled={login.isLoading || signup.isLoading}
          className="mt-5 disabled:bg-rose-400 bg-rose-500 text-white rounded p-2 text-sm w-full flex items-center gap-2 justify-center"
        >
          <FiUserPlus /> {loginMode ? "Login" : "Signup"}
        </button>
      </form>

      {!loginMode && (
        <button className="underline text-sm mt-5" onClick={() => setLoginMode(true)}>
          Have an account? Login
        </button>
      )}

      {loginMode && (
        <button className="underline text-sm mt-5" onClick={() => setLoginMode(false)}>
          Don't have an account? Sign up
        </button>
      )}
    </div>
  );
}

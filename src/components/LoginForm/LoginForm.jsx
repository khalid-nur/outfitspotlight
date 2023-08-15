import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, error, isPending } = useLogin();

  const submitHandler = (e) => {
    e.preventDefault();

    login(email, password);
    console.log(email);
    console.log(password);
  };

  return (
    <form onSubmit={submitHandler}>
      {/* Display a message when there's an error due to multiple unsuccessful login attempts  */}
      <div className=" max-w-[370px] mx-auto">
        {error && error.includes("auth/too-many-requests") && (
          <div className="text-white bg-[#E87C03] py-3 px-3 text-sm text-center  mb-8 rounded-md">
            Account temporarily disabled due to too many failed login attempts.
            Try again later to restore.
          </div>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium leading-5">
          Email
        </label>

        <div className="mt-1 rounded-md shadow-sm">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            id="email"
            name="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* Display a message when there's an error where users account with the provided email address could not be found  */}
        {error && error.includes("auth/user-not-found") && (
          <div className="text-red-600 text-sm tracking-wide cursor-pointer mt-1">
            Sorry, we can't find an account with this email address. Please try
            again or{" "}
            <span className=" underline " onClick={() => navigate("/signup")}>
              create a new account
            </span>
          </div>
        )}
      </div>

      <div className="mt-6">
        <label
          className="text-sm font-medium text-gray-700 leading-5"
          htmlFor="password"
        >
          Password
        </label>

        <div className="mt-1 rounded-md shadow-sm">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            id="password"
            type="password"
            autoComplete="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {/* Display an error message if the error user that the entered password is incorrect  */}
        {error && error.includes("auth/wrong-password") && (
          <div className="text-red-600 text-sm tracking-wide cursor-pointer mt-1">
            Incorrect password. Please try again
          </div>
        )}
      </div>

      <div className="mt-6">
        <span className="w-full rounded-md shadow-sm">
          <button
            className="flex justify-center w-full px-4 py-2 md:text-lg font-medium text-white bg-[#0095F6] border border-transparent rounded-full  focus:outline-none transition duration-150 ease-in-out"
            type="submit"
          >
            Log in
          </button>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;

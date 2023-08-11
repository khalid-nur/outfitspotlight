import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(email);
    console.log(password);
  };

  return (
    <form onSubmit={submitHandler}>
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

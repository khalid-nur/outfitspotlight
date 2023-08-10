import React from "react";
import EntryOslLogo from "../assets/entry-logo.png";
import LoginBackground from "../assets/osl-login-background.jpg";

const Login = () => {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row ">
      <img
        className="w-1/2 h-screen object-cover hidden md:block"
        src={LoginBackground}
        alt="OSL Background Image"
      />
      <div className="w-full md:w-1/2 bg-white ">
        <div className="flex items-center justify-center p-6 h-screen  ">
          <div className="flex flex-col lg:w-[475px] ">
            <div>
              <img src={EntryOslLogo} alt="OSL OutfitSpotlight Entry Logo" />

              <p className="mt-2 text-sm font-medium text-center text-[#737373] leading-5  tracking-tighter md:text-base lg:text-lg">
                Sign up to embrace the spotlight. Experience stunning outfits to
                redefine your signature style
              </p>
            </div>

            <div className="mt-8 ">
              <form>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-5"
                  >
                    Email
                  </label>

                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 leading-5"
                  >
                    Password
                  </label>

                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="password"
                      type="password"
                      autoComplete="password"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <span className="w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="flex justify-center w-full px-4 py-2 md:text-lg font-medium text-white bg-[#0095F6] border border-transparent rounded-full  focus:outline-none transition duration-150 ease-in-out"
                    >
                      Log in
                    </button>
                  </span>
                </div>
              </form>
            </div>
            <p className="text-center mt-12 ">
              Have an account already?
              <span className="text-[#0095F6] ml-1">Log in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

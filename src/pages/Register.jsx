import React from "react";
import EntryOslLogo from "../assets/entry-logo.png";
import SignupBackground from "../assets/osl-signup-background.avif";
import DefaultAvatar from "../assets/signup-default-avatar.png";

const Register = () => {
  return (
    <div>
      <div className="h-screen w-full flex flex-col md:flex-row ">
        <div className="w-full md:w-1/2 bg-white">
          <div className="flex items-center justify-center p-6 h-screen  ">
            <div className="flex flex-col lg:w-[475px] ">
              <div>
                <img src={EntryOslLogo} alt="OSL Background Image" />

                <p className="mt-2 text-sm font-medium text-center text-[#737373] leading-5  tracking-tighter md:text-base lg:text-lg">
                  Sign up to embrace the spotlight. Experience stunning outfits
                  to redefine your signature style
                </p>
              </div>

              <div className="mt-8 ">
                <form>
                  <div>
                    <label
                      className="text-sm font-medium leading-5"
                      htmlFor="username"
                    >
                      Username
                    </label>

                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        id="username"
                        type="text"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      className="text-sm font-medium leading-5"
                      htmlFor="email"
                    >
                      Email
                    </label>

                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        id="email"
                        name="email"
                        type="email"
                        required
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
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <img
                      className=" rounded-full inline-block w-16 h-16 object-cover object-center border-3 border-teal-500 mr-4 align-middle"
                      src={DefaultAvatar}
                      alt="default avatar"
                    />
                    <div className=" align-middle">
                      <label
                        className="  bg-blue-500 text-white text-center py-2 px-4 rounded-md  text-sm font-semibold cursor-pointer"
                        htmlFor="fileInput"
                      >
                        Upload Image
                      </label>
                      <input type="file" id="fileInput" className="hidden" />
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className="w-full rounded-md shadow-sm">
                      <button
                        className="flex justify-center w-full px-4 py-2 md:text-lg font-medium text-white bg-[#0095F6] border border-transparent rounded-full  focus:outline-none transition duration-150 ease-in-out"
                        type="submit"
                      >
                        Sign up
                      </button>
                    </span>
                  </div>
                </form>
              </div>
              <p className="text-center mt-12">
                Have an account already?
                <span className="text-[#0095F6] cursor-pointer"> Log in</span>
              </p>
            </div>
          </div>
        </div>
        <img
          className="w-1/2 h-screen object-cover hidden md:block"
          src={SignupBackground}
          alt="OSL Background Image"
        />
      </div>
    </div>
  );
};

export default Register;

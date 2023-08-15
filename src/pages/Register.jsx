import React from "react";
import EntryOslLogo from "../assets/entry-logo.png";
import SignupBackground from "../assets/osl-signup-background.png";

import SignupForm from "../components/SignupForm/SignupForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
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
                <SignupForm />
              </div>
              <p className="text-center mt-12">
                Have an account already?
                <span
                  className="text-[#0095F6] cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  {" "}
                  Log in
                </span>
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

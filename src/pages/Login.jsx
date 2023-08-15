import React from "react";
import EntryOslLogo from "../assets/entry-logo.png";
import LoginBackground from "../assets/osl-login-background.jpg";

import LoginForm from "../components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
                Enter the spotlight at OutfitSpotlight. Elevate your style to
                new heights.
                <span className=" font-semibold text-black/70 ml-1">
                  Join us now!
                </span>
              </p>
            </div>

            <div className="mt-8 ">
              <LoginForm />
            </div>
            <p className="text-center mt-12 ">
              Don't have an account?
              <span
                className="text-[#0095F6] ml-1 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

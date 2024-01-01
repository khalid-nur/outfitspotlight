import React from "react";
import notFound from "../assets/404-image.png";
import { Link } from "react-router-dom";

const NoPageFound = () => {
  return (
    <div className="grid place-content-center h-screen  ">
      <div className="flex flex-col items-center p-2">
        <div className="md:w-1/2">
          <img className="w-full " src={notFound} alt="" />
        </div>
        <h1 className="text-center text-3xl font-bold">
          Sorry, this page isn't available.
        </h1>
        <p className="text-xl font-medium text-center mt-4 ">
          The link you followed may be broken, or the page may have been
          removed. Go back to{" "}
          <span className=" font-bold">
            <Link to="/home">Outfitspotlight</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default NoPageFound;

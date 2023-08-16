import React from "react";
import { RotatingLines } from "react-loader-spinner";

const ButtonLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="25"
        visible={true}
      />
    </div>
  );
};

export default ButtonLoader;

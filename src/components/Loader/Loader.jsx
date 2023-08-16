import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spin size="large" />
    </div>
  );
};

export default Loader;

import React from "react";

const SkeletonLoader = () => {
  const skeleton = [];

  for (let i = 0; i < 4; i++) {
    skeleton.push(
      <div
        key={i}
        className="flex flex-col justify-start animate-pulse space-y-8 md:max-w-md"
      >
        <div className=" mb-2">
          <div className="flex items-center gap-1  ">
            <div className=" w-8 h-8 cursor-pointer  md:w-12 md:h-12 ">
              <div
                className="  w-full h-full bg-gray-200 rounded-full "
                alt="icon"
              />
            </div>

            <div className="flex flex-col bg-gray-200 h-8  w-4/5 md:w-4/5 ">
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold cursor-pointer dark:text-white"></p>
              </div>
            </div>
          </div>
        </div>

        <div className="  bg-gray-200 h-[296px] md:h-[464px]  dark:border-[#262626]"></div>
      </div>
    );
  }
  return <>{skeleton}</>;
};

export default SkeletonLoader;

import React from "react";

const SkeletonProduct = () => {
  const skeleton = [];

  for (let i = 0; i < 4; i++) {
    skeleton.push(
      <div
        key={i}
        className="max-w-[338px] h-48 md:h-[179px] p-2 drop-shadow-sm rounded-md cursor-pointer bg-gray-200 animate-pulse space-y-8 "
      >
        <div className="w-full h-full object-cover rounded-md" />
      </div>
    );
  }

  return (
    <>
      <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center  dark:bg-black ">
        <div className="flex flex-col md:flex-row w-full md:px-5">
          <div className="flex flex-col justify-center mt-8 w-full md:w-2/3 lg:w-1/2 ">
            <div className=" mx-3 md:mx-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center ">
                  <div className="w-12 h-12 rounded-full animate-pulse space-y-8  bg-gray-200"></div>
                  <div className="flex flex-col w-4/5 ml-2  animate-pulse md:w-36 bg-gray-200 h-10 ">
                    <div className="flex items-center justify-between"></div>
                    <p className=" text-xs  md:text-sm text-[#71767b] dark:text-[#A8A8A8]"></p>
                  </div>
                </div>
                <div className="flex items-center dark:text-white"></div>
              </div>
            </div>
            <div className=" relative bg-gray-200 animate-pulse space-y-8  dark:border-[#262626] mb-2">
              <div className="w-full h-[585px]  object-cover" />
              <div className=" absolute bottom-4 right-4   bg-gray-300 p-2.5 rounded-full animate-pulse space-y-8  md:p-4 "></div>
            </div>

            <div className="mx-3 md:mx-0">
              <div className="caption">
                <p className="dark:text-white">
                  <span className="font-semibold mr-1 dark:text-white"></span>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full  mt-8  md:mx-3">
            <div className=" ml-3 mb-4 ">
              <div className=" animate-pulse w-44 h-10 bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-1 justify-between mt-4 md:mt-7 md:gap-3 md:grid-cols-3 lg:grid-cols-4">
              {skeleton}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonProduct;

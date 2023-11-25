import React from "react";

const SkeletonProfile = () => {
  const skeleton = [];

  for (let i = 0; i < 3; i++) {
    skeleton.push(
      <div
        key={i}
        className="bg-gray-200 animate-pulse  w-[129px]  lg:w-[300px] h-48 md:w-[225px] md:h-[338px]"
      ></div>
    );
  }
  return (
    <>
      <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center dark:bg-black ">
        <div className="mx-auto mt-8 w-full max-w-[920px]  border-gray-100 dark:border-gray-800">
          {/* <!-- Profile picture and edit button --> */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="h-32 w-32 md:h-44 bg-gray-200 animate-pulse  md:w-44 cursor-pointer rounded-full" />

            <div
              className="
              rounded-lg  self-baseline bg-gray-200 animate-pulse  w-20 h-10 "
            ></div>
          </div>

          <div>
            <div className="mt-2 px-4">
              <div className="text-xl bg-gray-200 animate-pulse rounded-sm  w-60 h-5 "></div>
            </div>
            <div className=" max-w-md  mt-4 px-4">
              <div className="bg-gray-200 animate-pulse rounded-sm  w-80 h-5  "></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 justify-between mt-4 md:mt-7">
          {skeleton}
        </div>
      </div>
    </>
  );
};

export default SkeletonProfile;

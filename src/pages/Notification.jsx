import React from "react";
import DefaultAvatar from "../assets/signup-default-avatar.png";

const Notification = () => {
  return (
    <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center dark:bg-black ">
      <div className="flex flex-col justify-center mt-8  w-full max-w-3xl px-3 border-b-[1px] border-[#DBDBDB] dark:border-[#262626]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center ">
            <img
              src={DefaultAvatar}
              alt="icon"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col items-start justify-center ml-2">
              <div className="flex items-center gap-1">
                <p className="text-base font-semibold cursor-pointer dark:text-white">
                  khalid
                </p>
                <span className=" font-normal">liked your Post</span>
              </div>
              <p className=" text-sm text-[#71767b]  md:text-sm dark:text-[#A8A8A8]">
                98d
                {/* {getCurrentTimeStamp(posts.timestamp)} */}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end mb-2 dark:text-white">
            <img
              src={
                "https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww"
              }
              alt="icon"
              className=" w-16  h-16 md:w-20 md:h-20 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;

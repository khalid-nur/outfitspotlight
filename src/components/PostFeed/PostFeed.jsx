import React from "react";
import DefaultAvatar from "../../assets/signup-default-avatar.png";
import PostFeedButton from "../PostFeedButton/PostFeedButton";

const PostFeed = () => {
  return (
    <>
      <div className="container max-w-5xl mx-auto flex-col items-center justify-center hidden md:flex  dark:bg-black ">
        <div className="flex flex-col justify-center mt-8 w-full max-w-md border-b-[1px] h-[116px] bg-[#FFFFFF] border border-[#A8A8A8] rounded-lg dark:bg-black dark:border-[#A8A8A8]">
          <div className="flex items-center gap-4 p-3">
            <img
              className="w-12 h-12 rounded-full cursor-pointer"
              src={DefaultAvatar}
              alt="Default avatar image"
            />
            <button className=" w-4/5  bg-[#FFFFFF] border border-[#A8A8A8] hover:bg-[#EBEBEB] rounded-lg text-start pl-2 text-[#656565] italic text-sm dark:hover:bg-[#262626]  dark:bg-black">
              <PostFeedButton />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFeed;

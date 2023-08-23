import React from "react";
import DefaultAvatar from "../assets/signup-default-avatar.png";
import { RxDotFilled } from "react-icons/rx";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineHeart } from "react-icons/hi2";

const Explore = () => {
  return (
    <div className="container max-w-5xl mt-8 px-2 mx-auto grid grid-cols-2 gap-3 justify-between md:grid md:grid-cols-3 md:justify-between md:gap-3  dark:bg-black ">
      <div className="flex flex-col justify-start md:max-w-md">
        <div className=" mb-2">
          <div className="flex items-center gap-1  ">
            <div className=" w-8 h-8 cursor-pointer md:w-12 md:h-12 ">
              <img
                className="  w-full h-full rounded-full "
                src={DefaultAvatar}
                alt="icon"
              />
            </div>

            <div className="flex flex-col w-4/5 md:w-fit ">
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold cursor-pointer dark:text-white">
                  lifewithjazz
                </p>
                <RxDotFilled
                  className="hidden md:block dark:text-[#A8A8A8]"
                  size={10}
                />
                <AiFillPlusCircle
                  className=" cursor-pointer text-[#0095f6] md:hidden"
                  size={20}
                />
                <p className=" hidden text-[#0095f6] hover:text-[#00376b]  font-semibold cursor-pointer hover:dark:text-[#e0f1ff] md:block">
                  Follow
                </p>
              </div>
              <p className=" text-xs dark:text-[#A8A8A8]">9h</p>
            </div>
          </div>
        </div>

        <div className="relative border h-[296px] md:h-[464px]  dark:border-[#262626]">
          <img
            className="w-full h-full object-cover rounded"
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="post"
          />
          <div className=" absolute bottom-4 right-4  bg-white/60 p-1 rounded-full md:p-2 ">
            <HiOutlineHeart
              className=" stroke-black cursor-pointer hover:stroke-none hover:fill-gray-700"
              size={20}
            />
          </div>
        </div>

        {/* <div className="mx-3 md:mx-0 mb-3">
      <div className="post-info flex items-center justify-between mt-2">
        <div className=" dark:text-white">
          <AiOutlineHeart />
        </div>
        <div className="save"></div>
      </div>
      <p className="likes font-semibold mt-2 dark:text-white ">2 likes</p>
      <div className="caption">
        <p className="dark:text-white">
          <span className="font-semibold mr-1 dark:text-white">
            lifewithjazz
          </span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          et egestas est. Nunc placerat libero erat, vel fringilla est
          ultrices nec. Phasellus hendrerit turpis orci, eget luctus nibh
          vestibulum venenatis. 🙌🙌
        </p>
        <span className="show-more">
          <a href="#">...more</a>
        </span>
      </div>
    </div> */}
      </div>
    </div>
  );
};

export default Explore;

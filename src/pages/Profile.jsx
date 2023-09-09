import React from "react";
import DefaultAvatar from "../assets/signup-default-avatar.png";
import { LiaCalendarAlt } from "react-icons/lia";
import { BsLink45Deg } from "react-icons/bs";

function Profile() {
  return (
    <>
      <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center dark:bg-black ">
        <div className="mx-auto mt-8 w-full max-w-[920px]  border-gray-100 dark:border-gray-800">
          {/* <!-- Profile picture and edit button --> */}
          <div className="flex items-center justify-between px-4 py-3">
            <img
              className="h-32 w-32 md:h-44 md:w-44 cursor-pointer rounded-full"
              src={DefaultAvatar}
            />

            <div className=" hidden items-center gap-6 md:flex">
              <div className="flex flex-col items-center text-center cursor-pointer hover:underline">
                <span className=" text-lg font-semibold dark:text-[#f5f5f5]">
                  8
                </span>
                <span className=" text-lg  text-gray-700 dark:text-[#f5f5f5]">
                  Post
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer hover:underline">
                <span className=" text-lg font-semibold dark:text-[#f5f5f5]">
                  168
                </span>
                <span className="text-lg  text-gray-700 dark:text-[#f5f5f5]">
                  Followers
                </span>
              </div>
              <div className=" flex flex-col items-center cursor-pointer hover:underline">
                <span className=" text-lg font-semibold dark:text-[#f5f5f5]">
                  638
                </span>
                <span className=" text-lg  text-gray-700 dark:text-[#f5f5f5]">
                  Following
                </span>
              </div>
            </div>
            <button className=" rounded-lg  self-baseline text-base text-black font-semibold bg-[#efefef]  px-4 py-1.5  hover:bg-[#dbdbdb] dark:text-[#f5f5f5] dark:bg-[#363636] dark:hover:bg-[#262626] ">
              Edit profile
            </button>
          </div>

          {/* <!-- Name  --> */}
          <div className="mt-2 px-4">
            <h2 className="text-xl font-medium tracking-tight dark:text-[#f5f5f5]">
              lifewithjazz
            </h2>
          </div>

          {/* <!-- Bio --> */}
          <div className=" max-w-md mt-4 px-4">
            <p className="dark:text-[#f5f5f5]">
              Designing, building and talking about digital products. ✨
              Designing, building and talking about digital products. ✨
              Designing, building and talking about digital products.
            </p>
          </div>

          {/* <!-- Location, CTA and join date --> */}
          <div className="mt-3 flex items-center space-x-4 pl-4">
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-1">
                <LiaCalendarAlt
                  className="text-[#71767b] dark:text-[#71767b]"
                  size={20}
                />

                <p className="text-sm  md:text-base text-[#71767b] dark:text-gray-400">
                  Joined <span>August 2023</span>
                </p>
              </div>
              <BsLink45Deg
                className=" text-[#71767b] dark:text-[#71767b]"
                size={20}
              />
              <a
                className="text-sm md:text-base text-sky-500 hover:underline"
                href="https://www.linkedin.com/in/khalidnur/"
                target="_blank"
              >
                instagram/lifewithjazz
              </a>
            </div>
          </div>

          {/* <!-- Tabs --> */}
          <div className="mt-3 flex justify-evenly md:hidden">
            <div className="flex flex-col w-full cursor-pointer items-center justify-center p-2 transition duration-150 ease-in-out dark:text-[#f5f5f5] ">
              <span className=" text-lg font-semibold">8</span>
              <span className=" text-lg dark:text-[#f5f5f5] ">Post</span>
            </div>
            <div className="flex flex-col w-full cursor-pointer items-center justify-center span-2 transition duration-150 ease-in-out dark:text-[#f5f5f5]  ">
              <span className=" text-lg font-semibold">168</span>
              <span className="text-lg  dark:text-[#f5f5f5] ">Followers</span>
            </div>
            <div className="flex flex-col w-full cursor-pointer items-center justify-center span-2 transition duration-150 ease-in-out dark:text-[#f5f5f5] ">
              <span className=" text-lg font-semibold">638</span>
              <span className=" text-lg  dark:text-[#f5f5f5] ">Following</span>
            </div>
          </div>
        </div>

        {/* <!-- Photo Grid --> */}
        <div className="grid grid-cols-3 gap-[2px] justify-between mt-4 md:mt-7">
          <div className="max-w-[338px] h-40 md:h-[338px]">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
            />
          </div>
          <div className="max-w-[338px] h-40 md:h-[338px] ">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1614273445055-82e54a0e8089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            />
          </div>
          <div className="max-w-[338px] h-40 md:h-[338px] ">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1682685797857-97de838c192e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
            />
          </div>
          <div className="max-w-[338px] h-40 md:h-[338px] ">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1692866999796-bb538d3f9e92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            />
          </div>
          <div className="max-w-[338px] h-40 md:h-[338px] ">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1692969959077-7b16772805c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3328&q=80"
            />
          </div>
          <div className="max-w-[338px] h-40 md:h-[338px] ">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1692599076831-181663a5b26f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2335&q=80"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

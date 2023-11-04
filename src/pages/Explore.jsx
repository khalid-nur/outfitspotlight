import React from "react";
import { RxDotFilled } from "react-icons/rx";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineHeart } from "react-icons/hi2";
import { useCollection } from "../hooks/useCollection";
import Skeleton from "../components/Skeleton/Skeleton";
import { getCurrentTimeStamp } from "../helpers/useMoment";
import { Link } from "react-router-dom";
import DefaultAvatar from "../assets/signup-default-avatar.png";

const Explore = () => {
  const { documents, error, isPending } = useCollection("posts");

  console.log(documents);

  console.log(isPending);

  return (
    <div className="container max-w-5xl mt-8 px-2 mx-auto grid grid-cols-2 gap-3 justify-between md:grid md:grid-cols-3 md:justify-between md:gap-3  dark:bg-black ">
      {isPending && <Skeleton />}

      {documents &&
        documents.map((docs) => (
          <div
            className="flex flex-col justify-start  md:max-w-md"
            key={docs.id}
          >
            <div className=" mb-2">
              <div className="flex items-center gap-1  ">
                <div className=" w-8 h-8 cursor-pointer  md:w-12 md:h-12 ">
                  <img
                    className="  w-full h-full rounded-full bg-[#efefef]"
                    src={docs.photoURL ?? DefaultAvatar}
                    alt="icon"
                  />
                </div>

                <div className="flex flex-col w-4/5 md:w-fit ">
                  <div className="flex items-center justify-between">
                    {/* A clickable link to navigate to user profiles */}
                    <Link to={`/profile/${docs.userId}`}>
                      <p className="text-base font-semibold cursor-pointer dark:text-white">
                        {docs.username}
                      </p>
                    </Link>

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
                  <p className=" text-xs  md:text-sm text-[#71767b] dark:text-[#A8A8A8]">
                    {getCurrentTimeStamp(docs.timestamp)}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative border h-[296px] md:h-[464px] bg-[#efefef] rounded  dark:border-[#262626]">
              <img
                className="w-full h-full object-cover rounded cursor-pointer"
                src={docs.postImg}
                alt="post"
              />
              <div className=" absolute bottom-4 right-4  bg-white/60 p-1 rounded-full md:p-2 ">
                <HiOutlineHeart
                  className=" stroke-black cursor-pointer hover:stroke-none hover:fill-gray-700"
                  size={20}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Explore;

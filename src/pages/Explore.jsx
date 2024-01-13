import React from "react";
import { RxDotFilled } from "react-icons/rx";
import { useCollection } from "../hooks/useCollection";
import Skeleton from "../components/Skeleton/Skeleton";
import { getCurrentTimeStamp } from "../helpers/useMoment";
import { Link } from "react-router-dom";
import DefaultAvatar from "../assets/signup-default-avatar.png";
import LikeButton from "../components/LikeButton/LikeButton";
import FollowButton from "../components/FollowButton/FollowButton";
import { useAuthContext } from "../hooks/useAuthContext";

const Explore = () => {
  const { documents: postDocs, isPending } = useCollection("posts");
  const { user } = useAuthContext();

  return (
    <div className="container max-w-5xl mt-8 px-2 mx-auto grid grid-cols-2 gap-3 justify-between md:grid md:grid-cols-3 md:justify-between md:gap-3  dark:bg-black ">
      {isPending && <Skeleton />}

      {postDocs &&
        postDocs.map((post) => (
          <div
            className="flex flex-col justify-start  md:max-w-md"
            key={post.id}
          >
            <div className=" mb-2">
              <div className="flex items-center gap-1  ">
                <div className=" w-8 h-8 cursor-pointer  md:w-12 md:h-12 ">
                  <img
                    className="  w-full h-full object-cover rounded-full bg-[#efefef]"
                    src={post.photoURL ?? DefaultAvatar}
                    alt={`${post.username} profile picture`}
                  />
                </div>

                <div className="flex flex-col w-4/5 md:w-fit ">
                  <div className="flex items-center justify-between">
                    <Link to={`/profile/${post.userId}`}>
                      <p className="text-base font-semibold cursor-pointer dark:text-white">
                        {post.username}
                      </p>
                    </Link>

                    {post?.userId !== user.uid && (
                      <>
                        <RxDotFilled
                          className="hidden md:block dark:text-[#A8A8A8]"
                          size={10}
                        />
                        <FollowButton postData={post} />
                      </>
                    )}
                  </div>
                  <p className=" text-xs  md:text-sm text-[#71767b] dark:text-[#A8A8A8]">
                    {getCurrentTimeStamp(post.timestamp)}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative border h-[296px] md:h-[464px] bg-[#efefef] rounded  dark:border-[#262626]">
              <Link to={`/product/${post.id}`}>
                <img
                  className="w-full h-full object-cover rounded cursor-pointer"
                  src={post.postImg}
                  alt={`${post.username} post picture`}
                />
              </Link>
              <LikeButton postData={post} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Explore;

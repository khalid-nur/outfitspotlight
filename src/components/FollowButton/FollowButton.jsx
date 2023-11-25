import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirebase } from "../../hooks/useFirebase";
import { useCollection } from "../../hooks/useCollection";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoCheckmarkCircle } from "react-icons/io5";

const FollowButton = ({ postUserId }) => {
  const location = useLocation();
  // State to track if the current user is following
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useAuthContext();
  const currentUserId = user.uid;
  const { followUser } = useFirebase("follows");
  const { documents: follows } = useCollection("follows");

  useEffect(() => {
    // Filter the follows data to find follows related to the current post
    const postFollows = follows?.filter(
      (follow) => follow.postUserId === postUserId
    );
    // Check if the current user is already following the post's user by checking if their ID is in the list of users who follow the post
    const isUserFollowing = postFollows?.some(
      (follow) => follow?.currentUserId === currentUserId
    );
    // Update the isFollowing state based on whether the current user is following
    setIsFollowing(isUserFollowing);

    return () => {};
  }, [follows, postUserId, currentUserId, isFollowing]);

  const followHandler = () => {
    followUser(currentUserId, postUserId, isFollowing);
  };

  if (location.pathname.includes("profile")) {
    if (isFollowing) {
      return (
        <button
          className=" rounded-lg  self-baseline text-base text-black font-semibold bg-[#efefef] w-20 h-10 cursor-pointer  hover:bg-[#dbdbdb] dark:text-[#f5f5f5] dark:bg-[#363636] dark:hover:bg-[#262626]"
          onClick={followHandler}
        >
          Following
        </button>
      );
    } else {
      return (
        <button
          className=" rounded-lg  self-baseline text-base text-[#f5f5f5]  font-semibold bg-[#0095f6] w-20 h-10 cursor-pointer  hover:bg-[#1877f2]"
          onClick={followHandler}
        >
          Follow
        </button>
      );
    }
  }
  return (
    <>
      {isFollowing ? (
        <>
          <button
            className=" hidden text-[#0095f6] hover:text-[#00376b]  font-semibold cursor-pointer hover:dark:text-[#e0f1ff] md:block"
            onClick={followHandler}
          >
            Following
          </button>
          <IoCheckmarkCircle
            className=" cursor-pointer text-[#0095f6] md:hidden"
            onClick={followHandler}
            size={20}
          />
        </>
      ) : (
        <>
          <AiFillPlusCircle
            className=" cursor-pointer text-[#0095f6] md:hidden"
            onClick={followHandler}
            size={20}
          />
          <button
            className=" hidden text-[#0095f6] hover:text-[#00376b]  font-semibold cursor-pointer hover:dark:text-[#e0f1ff] md:block"
            onClick={followHandler}
          >
            Follow
          </button>
        </>
      )}
    </>
  );
};

export default FollowButton;

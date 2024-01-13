import { useState, useEffect } from "react";
import { HiOutlineHeart, HiMiniHeart } from "react-icons/hi2";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirebase } from "../../hooks/useFirebase";
import { useCollection } from "../../hooks/useCollection";
import { SlUserUnfollow } from "react-icons/sl";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const LikeButton = ({ postData }) => {
  // Tracking if the current post is liked by the user
  const [liked, setIsLiked] = useState(false);
  const { user } = useAuthContext();
  const currentUserId = user.uid;
  const { likePost } = useFirebase("like");
  const { documents: likes } = useCollection("like");

  // Update the liked state based on the likes collection
  useEffect(() => {
    // Filter likes related to this post
    const postLikes = likes?.filter((like) => like?.postId === postData.id);
    // Check if current user liked this post
    const userLiked = postLikes?.some((like) => like.userId === currentUserId);

    // Update liked state
    setIsLiked(userLiked);

    return () => {};
  }, [likes, postData?.id, currentUserId]);

  const likeHandler = () => {
    likePost(
      user.uid,
      postData.userId,
      postData.id,
      user,
      liked,
      postData.postImg
    );
  };

  if (location.pathname.includes("home")) {
    if (!liked) {
      return <AiOutlineHeart size={25} onClick={likeHandler} />;
    } else {
      return <AiFillHeart size={25} onClick={likeHandler} />;
    }
  }

  return (
    <>
      <div
        className=" absolute bottom-4 right-4  bg-white/60 p-1 rounded-full md:p-2 "
        onClick={likeHandler}
      >
        {!liked ? (
          <HiOutlineHeart
            className=" stroke-black cursor-pointer hover:stroke-none hover:fill-gray-700"
            size={20}
          />
        ) : (
          <HiMiniHeart
            className=" stroke-black cursor-pointer hover:stroke-none hover:fill-gray-700"
            size={20}
          />
        )}
      </div>
    </>
  );
};

export default LikeButton;

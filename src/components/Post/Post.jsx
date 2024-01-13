import { useEffect, useState, useRef } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getCurrentTimeStamp } from "../../helpers/useMoment";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import PostOptionsButton from "../PostOptionsButton/PostOptionsButton";
import LikeButton from "../LikeButton/LikeButton";
import { useFirebase } from "../../hooks/useFirebase";
import DefaultAvatar from "../../assets/signup-default-avatar.png";
import Comments from "../Comments/Comments";
import ShareButton from "../ShareButton/ShareButton";

const Post = () => {
  const { documents: postDocs, isPending } = useCollection(
    "posts",
    "timestamp",
    "desc"
  );
  const { documents: followDocs } = useCollection("follows");
  const { documents: likesDocs } = useCollection("like");
  const { documents: commentDocs } = useCollection("comments");
  const { postComment } = useFirebase("comments");
  const commentInputRefs = useRef({});

  const { user } = useAuthContext();
  const [postList, setPostList] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const currentUserId = user.uid;

  useEffect(() => {
    // Filtering to get IDs of users that the current user is following
    const followedUserIds = followDocs
      ?.filter((follow) => follow.currentUserId === currentUserId)
      .map((follow) => follow.postUserId);

    // Filtering posts to include those from followed users and the current user
    const postsFromFollowedUsers = postDocs?.filter(
      (post) =>
        followedUserIds.includes(post.userId) || post.userId === currentUserId
    );

    // Updating the state to hold the filtered list of posts
    setPostList(postsFromFollowedUsers);
  }, [followDocs, postDocs, currentUserId]);

  // Get the count of likes for a specific post
  const getPostLikeTotal = (postId) => {
    // Filtering likes to count only those that belong to the given post
    const likeCount = likesDocs?.filter(
      (like) => like.postId === postId
    ).length;
    return likeCount;
  };

  const commentSubmitHandler = (post) => {
    postComment(
      user.uid,
      post.userId,
      post.id,
      user,
      commentInput,
      post.postImg
    );

    setCommentInput("");
  };

  const focusCommentInput = (postId) => {
    commentInputRefs.current[postId].focus();
  };

  if (isPending) {
    return <Loader />;
  }

  // Display message if there are no posts
  if (postList?.length === 0) {
    return (
      <div className="container max-w-5xl mx-auto flex-col items-center justify-center flex h-screen md:h-96 dark:bg-black ">
        <div className="flex flex-col justify-center w-full max-w-md h-[116px] dark:text-white">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-semibold">Get Inspired</h2>
            <p className="text-lg font-medium">and find new people to follow</p>
            <Link to={"/explore"}>
              <button className="bg-black text-[#DBDBDB] px-20 py-1 rounded-md mt-4 dark:bg-white dark:text-[#262626]">
                Explore
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return postList?.map((posts) => (
    <div
      key={posts.id}
      className="container  mb-4 max-w-5xl mx-auto flex flex-col items-center justify-center dark:bg-black "
    >
      <div className="flex flex-col justify-center mt-8  w-full max-w-md border-b-[1px] border-[#DBDBDB] dark:border-[#262626]">
        <div className=" mx-3 md:mx-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center ">
              <Link to={`/profile/${posts.userId}`}>
                <img
                  src={posts.photoURL ?? DefaultAvatar}
                  alt={`${posts.username} profile picture`}
                  className="w-12 h-12 object-cover rounded-full"
                />
              </Link>
              <div className="flex flex-col ml-2">
                <div className="flex items-center">
                  <Link to={`/profile/${posts.userId}`}>
                    <p className="text-base font-semibold cursor-pointer dark:text-white">
                      {posts.username}
                    </p>
                  </Link>
                </div>
                <p className=" text-xs text-[#71767b]  md:text-sm dark:text-[#A8A8A8]">
                  {getCurrentTimeStamp(posts.timestamp)}
                </p>
              </div>
            </div>
            <div className="flex items-center dark:text-white">
              <PostOptionsButton postData={posts} />
            </div>
          </div>
        </div>

        <div className="relative border  bg-[#efefef] dark:border-[#262626]">
          <Link to={`/product/${posts.id}`}>
            <img
              src={posts.postImg}
              alt={`${posts.username} post picture`}
              className="w-full h-[585px] object-cover"
            />
          </Link>
        </div>

        <div className="mx-3 md:mx-0 mb-3">
          <div className="flex items-center justify-between mt-3">
            <div className=" flex gap-2 cursor-pointer dark:text-white">
              <LikeButton postData={posts} />

              <FiMessageCircle
                size={25}
                onClick={() => focusCommentInput(posts.id)}
              />

              <ShareButton postData={posts} />
            </div>
          </div>
          <div className="font-semibold mt-2 dark:text-white ">
            {getPostLikeTotal(posts.id)} <span className="ml-0.5">likes</span>
          </div>
          <div className="mb-2">
            <p className="dark:text-white">
              <span className="font-semibold mr-1 dark:text-white">
                {posts.username}
              </span>
              {posts.status}
            </p>
          </div>

          <div className="py-1 ">
            <Comments postId={posts.id} />
          </div>

          <div className="flex items-center mt-2 ">
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                commentSubmitHandler(posts);
              }}
            >
              <input
                className=" border-none outline-none bg-transparent text-base w-full dark:text-white  "
                ref={(inputElement) =>
                  (commentInputRefs.current[posts.id] = inputElement)
                }
                type="text"
                name="message"
                id="message"
                value={commentInput}
                placeholder="Add a comment..."
                onChange={(e) => setCommentInput(e.target.value)}
              />
            </form>
            <button
              className="px-1 text-sm font-semibold text-[#0095f6]"
              onClick={(e) => {
                e.preventDefault();
                commentSubmitHandler(posts);
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default Post;

import { useEffect, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getCurrentTimeStamp } from "../../helpers/useMoment";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import PostOptionsButton from "../PostOptionsButton/PostOptionsButton";
import LikeButton from "../LikeButton/LikeButton";

const Post = () => {
  const { documents: postDocs, isPending } = useCollection("posts");
  const { documents: followDocs } = useCollection("follows");
  const { documents: likesDocs } = useCollection("like"); // Fetching likes

  const { user } = useAuthContext();
  const [postList, setPostList] = useState([]);
  const currentUserId = user.uid;

  console.log(user.uid);
  // console.log(postDocs);
  // console.log(followsDocs);

  useEffect(() => {
    // Filtering to get IDs of users that the current user is following
    const followedUserIds = followDocs
      ?.filter((follow) => follow.currentUserId === currentUserId)
      .map((follow) => follow.postUserId);

    console.log(followedUserIds);

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
    console.log(`Likes for post ${postId}: `, likeCount);
    return likeCount;
  };

  console.log(postList);

  // TODO: Add skeleton for posts
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
      className="container max-w-5xl mx-auto flex flex-col items-center justify-center dark:bg-black "
    >
      <div className="flex flex-col justify-center mt-8  w-full max-w-md border-b-[1px] border-[#DBDBDB] dark:border-[#262626]">
        <div className=" mx-3 md:mx-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center ">
              <img
                src={posts.photoURL}
                alt="icon"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col ml-2">
                <div className="flex items-center">
                  <p className="text-base font-semibold cursor-pointer dark:text-white">
                    {posts.username}
                  </p>
                </div>
                <p className=" text-xs text-[#71767b]  md:text-sm dark:text-[#A8A8A8]">
                  {getCurrentTimeStamp(posts.timestamp)}
                </p>
              </div>
            </div>
            <div className="flex items-center dark:text-white">
              <PostOptionsButton postUserId={posts.userId} />
            </div>
          </div>
        </div>

        <div className="relative border  bg-[#efefef] dark:border-[#262626]">
          <img
            src={posts.postImg}
            alt="post"
            className="w-full h-[585px] object-cover"
          />
        </div>

        <div className="mx-3 md:mx-0 mb-3">
          <div className="flex items-center justify-between mt-3">
            <div className=" flex gap-2 cursor-pointer dark:text-white">
              <LikeButton postId={posts.id} />
              <FiMessageCircle size={25} />
              <IoPaperPlaneOutline size={25} />
            </div>
          </div>
          <div className="font-semibold mt-2 dark:text-white ">
            {getPostLikeTotal(posts.id)} <span className="ml-0.5">likes</span>
          </div>
          <div>
            <p className="dark:text-white">
              <span className="font-semibold mr-1 dark:text-white">
                {posts.username}
              </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              et egestas est. Nunc placerat libero erat, vel fringilla est
              ultrices nec. Phasellus hendrerit turpis orci, eget luctus nibh
              vestibulum venenatis.
            </p>
          </div>

          <form className="flex items-center mt-2 w-full ">
            <input
              className=" border-none outline-none bg-transparent text-sm dark:text-white  w-full  "
              type="text"
              placeholder="Add a comment..."
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="px-1 text-sm font-semibold text-[#0095f6]">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  ));
};

export default Post;

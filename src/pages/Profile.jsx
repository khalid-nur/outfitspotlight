import { useEffect, useState } from "react";
import { LiaCalendarAlt } from "react-icons/lia";
import { BsLink45Deg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import moment from "moment";
import PhotoGrid from "../components/ProfilePhotoGrid/PhotoGrid";
import DefaultAvatar from "../assets/signup-default-avatar.png";
import { useAuthContext } from "../hooks/useAuthContext";
import FollowButton from "../components/FollowButton/FollowButton";
import EditProfile from "../components/EditProfile/EditProfile";
import SkeletonProfile from "../components/Skeleton/SkeletonProfile";

function Profile() {
  // State to hold the user profile data
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [userPosts, setUserPosts] = useState([]);

  const { user } = useAuthContext();
  // Fetching users, posts, and follows data
  const { documents: userDocs, isPending } = useCollection("users");
  const { documents: postDocs } = useCollection("posts", "timestamp");
  const { documents: followDocs } = useCollection("follows");

  // Get the 'id' parameter from the URL (this should have id of the users Id for URL)
  const { id } = useParams();

  useEffect(() => {
    // Find the current user's data based on 'id'
    const currentProfile = userDocs?.find((userDoc) => userDoc.userId === id);
    // Filtering to find users that the current user is following.
    const userFollowing = followDocs?.filter(
      (follows) => follows.currentUserId === id
    );
    // Filtering to find users that are following the current user.
    const userFollowers = followDocs?.filter(
      (follows) => follows.postUserId === id
    );
    // Filtering to find posts made by the current user.
    const userPosts = postDocs?.filter((post) => post.userId === id);

    setCurrentUserProfile(currentProfile); // Updating the 'currentUserProfile' state by setting the current user's profile.
    setFollowingCount(userFollowing?.length); // Setting the number of users the current user is following.
    setFollowerCount(userFollowers?.length); // Setting the number of followers of the current user
    setUserPosts(userPosts); // Updating the state with posts made by the current user
  }, [userDocs, id, followDocs]);

  console.log("following: " + followingCount);
  console.log("followers: " + followerCount);

  console.log(userPosts?.[0]);

  if (isPending) {
    return <SkeletonProfile />;
  }

  return (
    <>
      <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center dark:bg-black ">
        <div className="mx-auto mt-8 w-full max-w-[920px]  border-gray-100 dark:border-gray-800">
          {/* <!-- Profile picture and edit button --> */}
          <div className="flex items-center justify-between px-4 py-3">
            <img
              className="h-32 w-32 md:h-44 md:w-44 cursor-pointer rounded-full  bg-[#efefef]"
              src={currentUserProfile?.photoURL ?? DefaultAvatar}
            />

            <div className=" hidden items-center gap-6 md:flex">
              <div className="flex flex-col items-center text-center">
                <span className=" text-lg font-semibold dark:text-[#f5f5f5]">
                  {userPosts?.length}
                </span>
                <span className=" text-lg  text-gray-700 dark:text-[#f5f5f5]">
                  Post
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer ">
                <span className=" text-lg font-semibold dark:text-[#f5f5f5]">
                  {followerCount}
                </span>
                <span className="text-lg  text-gray-700 dark:text-[#f5f5f5]">
                  Followers
                </span>
              </div>
              <div className=" flex flex-col items-center cursor-pointer ">
                <span className=" text-lg font-semibold dark:text-[#f5f5f5]">
                  {followingCount}
                </span>
                <span className=" text-lg  text-gray-700 dark:text-[#f5f5f5]">
                  Following
                </span>
              </div>
            </div>
            {user.uid === id ? (
              <EditProfile />
            ) : (
              <FollowButton postData={userPosts?.[0]} />
            )}
          </div>

          {/* <!-- Name  --> */}
          <div className="mt-2 px-4">
            <h2 className="text-xl font-medium tracking-tight dark:text-[#f5f5f5]">
              {currentUserProfile?.username}
            </h2>
          </div>

          {/* <!-- Bio --> */}
          <div className=" max-w-md mt-4 px-4">
            <p className="dark:text-[#f5f5f5]">{currentUserProfile?.bio}</p>
          </div>

          {/* <!-- Location, CTA and join date --> */}
          <div className="mt-3 flex items-center space-x-4 pl-4">
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-1">
                <LiaCalendarAlt
                  className="text-[#71767b] dark:text-[#71767b]"
                  size={20}
                />

                <p className="text-sm md:text-base text-[#71767b] dark:text-gray-400">
                  Joined
                  <span className="ml-1">
                    {moment(currentUserProfile?.timestamp.toDate()).format(
                      "MMMM YYYY"
                    )}
                  </span>
                </p>
              </div>

              {currentUserProfile?.webUrl && (
                <div className="flex items-center">
                  <BsLink45Deg
                    className="text-[#71767b] dark:text-[#71767b]"
                    size={20}
                  />
                  <a
                    className="text-sm md:text-base text-sky-500 hover:underline ml-1"
                    href={currentUserProfile?.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {currentUserProfile.webUrl.replace(/^(https?:\/\/)/, "")}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* <!-- Tabs --> */}
          <div className="mt-3 flex justify-evenly md:hidden">
            <div className="flex flex-col w-full cursor-pointer items-center justify-center p-2 transition dark:text-[#f5f5f5] ">
              <span className=" text-lg font-semibold">
                {userPosts?.length}
              </span>
              <span className=" text-lg dark:text-[#f5f5f5] ">Post</span>
            </div>
            <div className="flex flex-col w-full cursor-pointer items-center justify-center  dark:text-[#f5f5f5]  ">
              <span className=" text-lg font-semibold"> {followerCount}</span>
              <span className="text-lg  dark:text-[#f5f5f5] ">Followers</span>
            </div>
            <div className="flex flex-col w-full cursor-pointer items-center justify-center  dark:text-[#f5f5f5] ">
              <span className=" text-lg font-semibold">{followingCount}</span>
              <span className=" text-lg  dark:text-[#f5f5f5] ">Following</span>
            </div>
          </div>
        </div>

        {/* <!-- Photo Grid --> */}
        <div className="grid grid-cols-3 gap-1 justify-between mt-4 md:mt-7">
          {postDocs && <PhotoGrid userPhotoDocs={postDocs} />}
        </div>
      </div>
    </>
  );
}

export default Profile;

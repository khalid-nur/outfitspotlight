import { useEffect, useState } from "react";
import { LiaCalendarAlt } from "react-icons/lia";
import { BsLink45Deg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import moment from "moment";
import PhotoGrid from "../components/ProfilePhotoGrid/PhotoGrid";

function Profile() {
  // State to hold the user profile data
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  // Fetch user data and post data for firebase
  const { documents: userDocs } = useCollection("users");
  const { documents } = useCollection("posts");

  // Get the 'id' parameter from the URL (this should have id of the users Id for URL)
  const { id } = useParams();

  // useEffect to update the user profile data when 'userDocs' or 'id' changes
  useEffect(() => {
    // Find the current user's data based on 'id'
    const currentUser = userDocs?.find((userDoc) => userDoc?.userId === id);

    // Update the 'currentUserProfile' state
    setCurrentUserProfile(currentUser);
    return () => {};
  }, [userDocs, id]);

  return (
    <>
      <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center dark:bg-black ">
        <div className="mx-auto mt-8 w-full max-w-[920px]  border-gray-100 dark:border-gray-800">
          {/* <!-- Profile picture and edit button --> */}
          <div className="flex items-center justify-between px-4 py-3">
            <img
              className="h-32 w-32 md:h-44 md:w-44 cursor-pointer rounded-full"
              src={currentUserProfile?.photoURL}
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

                <p className="text-sm  md:text-base text-[#71767b] dark:text-gray-400">
                  Joined{" "}
                  <span>
                    {moment(currentUserProfile?.timestamp.toDate()).format(
                      "MMMM YYYY"
                    )}
                  </span>
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
        <div className="grid grid-cols-3 gap-1 justify-between mt-4 md:mt-7">
          {documents && <PhotoGrid userPhotoDocs={documents} />}
        </div>
      </div>
    </>
  );
}

export default Profile;

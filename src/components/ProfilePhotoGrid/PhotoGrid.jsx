import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import { FiCameraOff } from "react-icons/fi";
import PostOptionsButton from "../PostOptionsButton/PostOptionsButton";
import { useAuthContext } from "../../hooks/useAuthContext";

const PhotoGrid = ({ userPhotoDocs }) => {
  // State to hold user photos
  const [userPhotos, setUserPhotos] = useState(null);
  // Get the id parameter from the URL (This should contain the user ID obtained from the URL)
  const { id } = useParams();

  const { user } = useAuthContext();

  // Filter and update user photos based on id
  useEffect(() => {
    // Filter userPhotoDocs to get photos associated with the user matching id
    const currentUser = userPhotoDocs.filter(
      (userPhotos) => userPhotos.userId === id
    );

    // Set the filtered photos into userPhotos state
    setUserPhotos(currentUser);
    return () => {};
  }, [userPhotoDocs, id]);

  // Display message if there are no posts
  if (userPhotos?.length == 0) {
    return (
      <>
        <div></div>
        <div className="h-[calc(100vh-435px)] flex flex-col justify-center items-center dark:text-white ">
          <FiCameraOff size={55} />
          <p className=" mt-2 text-2xl md:text-3xl font-medium">No Post Yet</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* render user photos */}
      {userPhotos?.map((userPhoto) => (
        <div
          key={userPhoto.id}
          className=" relative cursor-pointer  bg-[#efefef] w-full lg:w-[300px] h-48 md:h-[338px]"
        >
          {user.uid === id && (
            <div className="absolute top-0 right-4 md:p-2 ">
              <PostOptionsButton postData={userPhoto} />
            </div>
          )}

          <Link to={`/product/${userPhoto.id}`}>
            <img
              className=" w-full h-full object-cover -z-10"
              src={userPhoto?.postImg}
              alt={`${userPhoto.username} post picture`}
            />
          </Link>

          <LikeButton postData={userPhoto} />
        </div>
      ))}
    </>
  );
};

export default PhotoGrid;

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";

const PhotoGrid = ({ userPhotoDocs }) => {
  const location = useLocation();
  // State to hold user photos
  const [userPhotos, setUserPhotos] = useState(null);
  // Get the id parameter from the URL (This should contain the user ID obtained from the URL)
  const { id } = useParams();

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

  return (
    <>
      {/* render user photos */}
      {userPhotos?.map((userPhoto) => (
        <div
          key={userPhoto.id}
          className=" relative cursor-pointer  bg-[#efefef] w-full lg:w-[300px] h-48 md:h-[338px]"
        >
          <img
            className="w-full h-full object-cover"
            src={userPhoto?.postImg}
          />
          <div className=" absolute top-0 left-0 w-full h-full opacity-0 hover:bg-black/50 hover:opacity-100 ">
            <LikeButton postId={userPhoto.id} />
          </div>
        </div>
      ))}
    </>
  );
};

export default PhotoGrid;

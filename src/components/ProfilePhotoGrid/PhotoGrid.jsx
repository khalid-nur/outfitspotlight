import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PhotoGrid = ({ userPhotoDocs }) => {
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

  console.log(userPhotos);

  return (
    <>
      {/* render user photos */}
      {userPhotos?.map((userPhoto) => (
        <div
          key={userPhoto.id}
          className=" w-full lg:w-[300px] h-48 md:h-[338px]"
        >
          <img
            className="w-full h-full object-cover"
            src={userPhoto?.postImg}
          />
        </div>
      ))}
    </>
  );
};

export default PhotoGrid;

import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import {
  collection,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDocument } from "../../hooks/useDocument";

const EditProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  // Get the current user and user document using custom hooks
  const { user } = useAuthContext();
  const { document: userDoc } = useDocument("users", user.uid);

  console.log(userDoc);
  console.log(auth.currentUser);
  console.log(user.uid);

  // Open the profile editor modal
  const openProfileEditor = () => {
    setUrlError("");
    setIsModalOpen(true);

    // Using the user's current data, initialize the state
    setUsername(userDoc?.username || "");
    setBio(userDoc?.bio || "");
    setWebUrl(userDoc?.webUrl || "");
    setThumbnail(null);
  };

  // Upload an image to the firebase storage
  const uploadImage = async (userId, imageFile) => {
    const storageRef = ref(storage, `thumbnails/${userId}/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Update current logged in user display name
  const updateUserProfile = async () => {
    // Update user profile
    await updateProfile(auth.currentUser, { displayName: username });
  };

  // Update user document in Firestore
  const updateUserDocument = async () => {
    // Getting the user document reference based on current user's id
    const userDocumentRef = doc(collection(db, "users"), user.uid);

    // Update user document fields
    await updateDoc(userDocumentRef, {
      bio: bio,
      username: username,
      webUrl: webUrl,
    });
  };

  // Update post documents related to the user
  const updatePostDocuments = async () => {
    // Getting  all post documents based on the current user's id
    const postQuery = query(
      collection(db, "posts"),
      where("userId", "==", user.uid)
    );
    const postQuerySnapshot = await getDocs(postQuery);

    console.log(postQuerySnapshot);

    // Update all post documents usernames
    postQuerySnapshot.forEach(async (postDoc) => {
      const postDocumentRef = doc(db, "posts", postDoc.id);
      await updateDoc(postDocumentRef, { username: username });
    });
  };

  // Update profile photo and related documents
  const updateProfilePhoto = async () => {
    const imageUrl = await uploadImage(user.uid, thumbnail);

    // Update user document fields
    const userDocumentRef = doc(collection(db, "users"), user.uid);
    await updateDoc(userDocumentRef, {
      bio: bio,
      username: username,
      photoURL: imageUrl,
    });

    // Getting  all post documents based on the current user's id
    const postQuery = query(
      collection(db, "posts"),
      where("userId", "==", user.uid)
    );
    const postQuerySnapshot = await getDocs(postQuery);

    // Update all post documents profile photos
    postQuerySnapshot.forEach(async (postDoc) => {
      const postDocumentRef = doc(db, "posts", postDoc.id);
      await updateDoc(postDocumentRef, { photoURL: imageUrl });
    });

    // Update current logged in user profile photo
    await updateProfile(auth.currentUser, { photoURL: imageUrl });
  };

  // Save and update changes
  const saveProfileChanges = async (e) => {
    e.preventDefault();

    // Regex pattern to validate URLs
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    // Check if the URL is valid or empty
    if (urlPattern.test(webUrl) || webUrl === "") {
      console.log("This is a valid URL or an empty string");
      console.log(thumbnail, username, bio, webUrl);

      // Update user profile, user document, and related posts
      await updateUserProfile();
      await updateUserDocument();
      await updatePostDocuments();

      // If a thumbnail image is provided, update the profile photo
      if (thumbnail) {
        // If a thumbnail is provided, update the profile photo
        await updateProfilePhoto();
        // Reload the page to see the changes
        location.reload();
      }

      setIsModalOpen(false);
    } else {
      console.log("This is an invalid URL");

      // Display an error message for invalid URLs
      setUrlError("Account update failed: URL is not valid.");
      // Set an error message for invalid URLs and clear it after 3 seconds
      setTimeout(() => {
        setUrlError("");
      }, 3000);
    }
  };

  const imageChangeHandler = (e) => {
    const selectedImage = e.target.files[0];

    // Set the selected image as the thumbnail
    setThumbnail(selectedImage);

    // Create a FileReader to read the image file
    const reader = new FileReader();

    // Set up an event handler for when the reader finishes reading the file
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };

    // Read the image file as a data URL
    reader.readAsDataURL(selectedImage);
  };

  // Reset forms and close the modal when canceling profile editing
  const cancelProfileEditing = () => {
    setUsername("");
    setBio("");
    setWebUrl("");
    setThumbnail(null);
    setThumbnailPreview("");
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className=" rounded-lg  self-baseline text-base text-black font-semibold bg-[#efefef]  px-4 py-1.5  hover:bg-[#dbdbdb] dark:text-[#f5f5f5] dark:bg-[#363636] dark:hover:bg-[#262626]"
        onClick={openProfileEditor}
      >
        Edit profile
      </button>

      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onCancel={cancelProfileEditing}
        footer={[
          <Button key="back" onClick={cancelProfileEditing}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            className="bg-[#3F96FE] text-white py-1 px-4 ml-1 border transition-none rounded-md "
            onClick={saveProfileChanges}
          >
            Save
          </Button>,
        ]}
      >
        <form onSubmit={saveProfileChanges}>
          <div className=" relative flex items-center justify-between mt-6">
            <img
              className="w-28 h-28 mt-2 rounded-full object-cover object-center border-3 border-teal-500"
              src={thumbnailPreview || user?.photoURL}
              alt="Profile Photo Preview"
            />
            <div className=" align-middle">
              <label
                className=" flex  bg-blue-500 text-white text-center py-2 px-1.5 rounded-md  text-sm font-semibold cursor-pointer"
                htmlFor="fileInput"
              >
                Change Profile Photo
              </label>
              <input
                type="file"
                autoComplete="password"
                id="fileInput"
                accept="image/*"
                className="hidden"
                onChange={imageChangeHandler}
              />
            </div>
          </div>
          <div className="mt-6">
            <label
              className="text-sm font-medium text-gray-700 leading-5"
              htmlFor="username"
            >
              Name
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-500  sm:text-sm "
                id="username"
                type="text"
                autoComplete="password"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700 leading-5">
              Bio
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <textarea
                className=" h-20 w-full outline-none resize-none text-base px-3 py-2 border border-gray-300 rounded-md sm:text-sm sm:leading-5"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              className="text-sm font-medium text-gray-700 leading-5"
              htmlFor="urlInput"
            >
              Website
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                name="url"
                type="url"
                id="urlInput"
                onChange={(e) => setWebUrl(e.target.value)}
                value={webUrl}
              />
            </div>
            {/* Display 'username' validation error */}
            {urlError && (
              <div className="text-red-600 text-sm mt-1">
                {urlError}
                {/* {customError.username} */}
              </div>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditProfile;

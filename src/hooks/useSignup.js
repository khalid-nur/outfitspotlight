import { useState } from "react";
import { auth, storage } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (username, email, password, thumbnail) => {
    setError(null); // Clear any previous errors
    setIsPending(true); // Set loading state

    console.log(username);
    try {
      // Create user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res.user) {
        throw new Error("could not complete signup");
      }
      // Default value for thumbnailImageUrl
      let thumbnailImageUrl = null;

      if (thumbnail) {
        // Define the upload path for the thumbnail
        const thumbnailUploadPath = `thumbnails/${auth.currentUser.uid}/${thumbnail.name}`;

        // Upload thumbnail to storage
        await uploadBytes(ref(storage, thumbnailUploadPath), thumbnail);

        // Get the download URL of the uploaded thumbnail
        thumbnailImageUrl = await getDownloadURL(
          ref(storage, thumbnailUploadPath)
        );
      }

      // Update user profile with display name and photo URL
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: thumbnailImageUrl,
      });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false); // Clear loading state
      setError(null); // Clear any errors
    } catch (err) {
      setError(err.message); // Set error message
      setIsPending(false); // Clear loading state
    }
  };

  return { error, isPending, signup };
};

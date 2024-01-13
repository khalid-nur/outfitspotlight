import { useState, useEffect } from "react";
import { auth, storage, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (username, email, password, thumbnail) => {
    setError(null); // Clear any previous errors
    setIsPending(true); // Set loading state

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

      // Create a user collection to store user info
      const usersCollection = collection(db, "users");
      // Get the current user's unique ID
      const userId = auth.currentUser.uid;
      // Get the current user's email
      const userEmail = auth.currentUser.email;
      // Create a reference to the document for the current user within the users collection
      const userDoc = doc(usersCollection, userId);

      // Add a document in the 'users' collection
      await setDoc(userDoc, {
        username: username,
        photoURL: thumbnailImageUrl,
        userId: userId,
        userEmail: userEmail,
        bio: "",
        timestamp: serverTimestamp(),
        webUrl: "",
      });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // Check if the component is not unmounted before updating state
      if (!isCancelled) {
        setIsPending(false); // Clear loading state
        setError(null); // Clear any errors
      }
    } catch (err) {
      // Check if the component is not unmounted before updating state

      setError(err.message); // Set error message
      setIsPending(false); // Clear loading state
    }
  };

  // If component unmounting, set isCancelled to true
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, isPending, signup };
};

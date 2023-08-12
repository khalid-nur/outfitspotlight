import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (username, email, password, thumbnail) => {
    setError(null); // Clear any previous errors
    setIsPending(true); // Set loading state

    try {
      // Create user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("🚀 ~ file: useSignup.js:15 ~ signup ~ res:", res.user);

      if (!res.user) {
        throw new Error("could not complete signup");
      }

      // Add display name to user
      await updateProfile(auth.currentUser, {
        username: username,
      });

      setIsPending(false); // Clear loading state
      setError(null); // Clear any errors
    } catch (err) {
      setError(err.message); // Set error message
      setIsPending(false); // Clear loading state
    }
  };

  return { error, isPending, signup };
};

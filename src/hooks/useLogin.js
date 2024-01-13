import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext(); // Access the authentication context

  const login = async (email, password) => {
    setError(null); // Clear any previous error
    setIsPending(true); // Set the pending state to true while login is in progress

    // Attempt to sign in the user
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      // Dispatch a login action to update the authentication context with the user's data
      dispatch({ type: "LOGIN", payload: res.user });

      // Check if the component is not unmounted before updating state
      if (!isCancelled) {
        setError(null); // Clear any error messages
        setIsPending(false); // Set pending state to false after successful login
      }
    } catch (err) {
      setError(err.message); // Set the error state with the error message
      setIsPending(false);
      // }
    }
  };

  // If component unmounting, set isCancelled to true
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return { login, error, isPending };
};

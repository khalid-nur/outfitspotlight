import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext(); // Access the authentication context

  const login = async (email, password) => {
    setError(null); // Clear any previous error
    setIsPending(true); // Set the pending state to true while login is in progress

    // Attempt to sign in the user
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      // Dispatch a login action to update the authentication context with the user's data
      dispatch({ type: "LOGIN", payload: res.user });

      setError(null); // Clear any error messages
      setIsPending(false); // Set pending state to false after successful login
    } catch (err) {
      console.log(err.message);
      setError(err.message); // Set the error state with the error message
      setIsPending(false);
    }
  };
  return { login, error, isPending };
};

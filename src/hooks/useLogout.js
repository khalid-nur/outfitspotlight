import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null); // Clear any previous error
    setIsPending(true); // Set the pending state to true while logout is in progress

    // Attempt to sign out the user
    try {
      await signOut(auth);

      // Dispatch a logout action to update the authentication context
      dispatch({ type: "LOGOUT" });

      setError(null); // Clear any error messages
      setIsPending(false); // Set pending state to false after successful logout
    } catch (err) {
      console.log(err.message);
      setError(err.message); // Set the error state with the error message
      setIsPending(false); // Set pending state to false after a failed logout attempt
    }
  };

  return { logout, error, isPending };
};

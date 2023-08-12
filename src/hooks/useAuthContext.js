import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  // Get the context value using the useContext hook
  const context = useContext(AuthContext);

  // Return the context value
  return context;
};

import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Create a new context called "AuthContext"
export const AuthContext = createContext();

// Managing authentication state changes
export const authReducer = (state, action) => {
  switch (action.type) {
    // When a user logs in, update the state with the new user data
    case "LOGIN":
      return { ...state, user: action.payload };

    // When a user logs out, clear the user data from the state
    case "LOGOUT":
      return { ...state, user: null };

    // When the authentication status is ready, update user data and set authIsReady to true
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };

    // If the provided action type is not identifiable, return the current state unchanged
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  // Use the useReducer hook to manage state and dispatch actions
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  console.log("AuthContext State", state);

  // listen for authentication state changes
  useEffect(() => {
    // Subscribe to onAuthStateChanged, which triggers when user authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user }); // Update the state with the user's authentication status
      unsubscribe(); // Unsubscribe from onAuthStateChanged after the first call
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

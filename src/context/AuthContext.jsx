import { createContext, useReducer } from "react";

// Create a new context called "AuthContext"
export const AuthContext = createContext();

// Managing authentication state changes
export const authReducer = () => {
  switch (action.type) {
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  // Use the useReducer hook to manage state and dispatch actions
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

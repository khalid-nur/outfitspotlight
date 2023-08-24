import { useReducer } from "react";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Set initial state for the firestoreReducer
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

// Reducer function for managing state changes
const firestoreReducer = (state, action) => {
  switch (action.type) {
    // Set pending state before adding document
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };

    // When a document has been successfully added
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    // When an error occurs during Firestore operation
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const useFirebase = (col) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // Create a reference to a Firestore collection using 'col'
  const ref = collection(db, col);

  // function to add data to Firestore
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      // Add a new document to the Firestore collection with server timestamp
      const addedDocument = await addDoc(ref, {
        ...doc,
        timestamp: serverTimestamp(),
      });

      // Update state indicating successful document addition
      dispatch({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      // Handle error and update state
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  // Return functions and state for component use
  return { addDocument, response };
};

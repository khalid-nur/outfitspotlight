import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (col) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // Update loading status to indicate data fetching is in progress
    setIsPending(true);

    // Create a reference to the Firestore collection
    let ref = collection(db, col);

    // Set up a snapshot listener to react to changes in the Firestore collection
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        // Initialize an array to hold fetched document data
        let results = [];
        // Loop through each document in the snapshot
        snapshot.docs.forEach((doc) => {
          // Push each document's data along with its ID into the results
          results.push({ ...doc.data(), id: doc.id });
        });

        setIsPending(false); // Loading is complete
        setError(null); // Clear any previous error messages
        setDocuments(results); // Update the documents state with fetched data
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data");
      }
    );
    // The returned function will be called when the component unmounts or 'col' changes
    return () => unsubscribe();
  }, [col]);

  // Return the fetched documents, error message, and loading status to the component
  return { documents, error, isPending };
};

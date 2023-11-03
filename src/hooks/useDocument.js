import { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useDocument = (col, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);

    // Create a Firestore document reference
    const docRef = doc(db, col, id);

    // Set up a real-time listener for the document
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        setDocument({ ...snapshot.data(), id: snapshot.id });

        setIsPending(false); // Loading is complete
        setError(null); // Clear any previous error messages
      },
      (err) => {
        console.log(err);
        setError("Could not fetch the data");
        setIsPending(false); // Loading is complete
      }
    );
    return () => unsubscribe();
  }, [col, id]);

  return { document, error, isPending };
};

import { useReducer } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

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

    // When a post has been successfully liked
    case "LIKED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    // When a user has been successfully followed or unfollowed
    case "FOLLOW_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    // When a notification has been successfully read
    case "READ_NOTIFICATION":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    // When a comment has been successfully posted
    case "POST_COMMENT":
      return {
        isPending: false,
        document: {
          comment: action.payload.addedComment,
          notification: action.payload.notificationData,
        },
        success: true,
        error: null,
      };

    // When a post has been successfully been deleted
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
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
  const notificationCollection = collection(db, "notification");

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

  // Like Post function
  const likePost = async (
    userId,
    recipientUserId,
    postId,
    auth,
    liked,
    postData
  ) => {
    dispatch({ type: "IS_PENDING" });

    // Create document references for liking and notifications
    const docToLike = doc(ref, `${userId}_${postId}`);
    const docToNotify = doc(
      notificationCollection,
      `${recipientUserId}_${userId}_${postId}`
    );

    let notificationData;

    try {
      // If the post is already liked, delete the like and notification documents
      if (liked) {
        await deleteDoc(docToLike);
        await deleteDoc(docToNotify);
      } else {
        // If the post is not liked, create a new document for liking the post
        await setDoc(docToLike, { userId, postId });

        // Create a notification if the liker is not the same as the post owner
        if (userId !== recipientUserId) {
          notificationData = {
            senderUserName: auth.displayName,
            senderUserPhotoUrl: auth.photoURL,
            recipientUserId: recipientUserId,
            senderUserEmail: auth.email,
            senderUserId: auth.uid,
            type: "liked",
            postId: postId,
            postData: postData,
            timestamp: serverTimestamp(),
            isRead: false,
          };
          // Create the notification document and store it firebase
          await setDoc(docToNotify, notificationData);
        }
      }

      // Dispatching an action to update state with the result of the like/unlike action
      dispatch({
        type: "LIKED_DOCUMENT",
        payload: notificationData,
      });
    } catch (err) {
      // Dispatch an error
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  // Follow User function
  const followUser = async (currentUserId, postUserId, auth, isFollowing) => {
    dispatch({ type: "IS_PENDING" });

    // Create document references for following a user and for notifications
    const docToFollow = doc(ref, `${currentUserId}_${postUserId}`);
    const docToNotify = doc(
      notificationCollection,
      `${postUserId}_${currentUserId}`
    );

    let notificationData;

    try {
      // If the user is already following, delete the follow document and notification
      if (isFollowing) {
        await deleteDoc(docToFollow);
        await deleteDoc(docToNotify);
      } else {
        // If the user is not following, create a new document to represent the follow action
        await setDoc(docToFollow, {
          currentUserId,
          postUserId,
        });

        // If the follower is different from the user being followed
        if (currentUserId !== postUserId) {
          notificationData = {
            senderUserName: auth.displayName,
            senderUserPhotoUrl: auth.photoURL,
            recipientUserId: postUserId,
            senderUserEmail: auth.email,
            senderUserId: auth.uid,
            type: "followed",
            timestamp: serverTimestamp(),
            isRead: false,
          };
          // Create a notification document in Firestore
          await setDoc(docToNotify, notificationData);
        }
      }

      // Dispatching an action to update the state with the follow/unfollow result
      dispatch({
        type: "FOLLOW_DOCUMENT",
        payload: notificationData,
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  // Post Comments function
  const postComment = async (
    userId,
    recipientUserId,
    postId,
    auth,
    comment,
    postData
  ) => {
    dispatch({ type: "IS_PENDING" });

    try {
      // Add the comment to the Firestore database
      const addedComment = await addDoc(ref, {
        userId,
        postId,
        comment,
        senderUserName: auth.displayName,
        senderUserPhotoUrl: auth.photoURL,
        timeStamp: serverTimestamp(),
      });

      const notificationRef = doc(notificationCollection, crypto.randomUUID());

      let notificationData;

      // Check if the user commenting is not the same as the post's recipient
      if (userId !== recipientUserId) {
        notificationData = {
          senderUserName: auth.displayName,
          senderUserPhotoUrl: auth.photoURL,
          recipientUserId: recipientUserId,
          senderUserId: auth.uid,
          type: "commented",
          postId: postId,
          commentData: comment,
          postData: postData,
          timestamp: serverTimestamp(),
          isRead: false,
        };

        // Save the notification data in Firestore notifications collection
        await setDoc(notificationRef, notificationData);
      }

      // Dispatch success action with the new comment and notification data
      dispatch({
        type: "POST_COMMENT",
        payload: { addedComment, notificationData },
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  // Read notification
  const readNotification = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      // Create a reference to a specific notification in the database using its id.
      const docToUpdate = doc(notificationCollection, id);

      // Update the notification in the database to mark it as read.
      await updateDoc(docToUpdate, { isRead: true });

      // Dispatching an action to update the state, indicating the notification has been read
      dispatch({
        type: "READ_NOTIFICATION",
        payload: docToUpdate,
      });
    } catch (err) {
      // Handle error and update state
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  // Delete a Post Function
  const deletePost = async (postId) => {
    dispatch({ type: "IS_PENDING" });

    try {
      // Creating a reference to the specific document in the Firestore database using the provided postId
      const docRef = doc(db, col, postId);

      // Deleting the document from database using the postId reference
      await deleteDoc(docRef);

      // Dispatching an action to update the state indicating the document has been deleted
      dispatch({
        type: "DELETED_DOCUMENT",
        payload: deleteDoc,
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  // Return functions and state for component use
  return {
    addDocument,
    response,
    likePost,
    followUser,
    readNotification,
    postComment,
    deletePost,
  };
};

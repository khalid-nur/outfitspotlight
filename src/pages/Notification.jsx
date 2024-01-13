import { useEffect, useState } from "react";
import DefaultAvatar from "../assets/signup-default-avatar.png";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment";
import { useFirebase } from "../hooks/useFirebase";

const Notification = () => {
  const { documents: notificationDocs } = useCollection(
    "notification",
    "timestamp",
    "desc"
  );
  const { user } = useAuthContext();
  const [userNotifications, setUserNotifications] = useState(null);
  const { readNotification } = useFirebase("notification");

  useEffect(() => {
    // Filtering  notifications specific to the current user
    const currentUserNotifications = notificationDocs?.filter(
      (notification) => notification?.recipientUserId === user.uid
    );

    // Updating the state with filtered notifications
    setUserNotifications(currentUserNotifications);
  }, [notificationDocs, user.uid]);

  // Check if all notifications in the list have been marked as read
  const allNotificationsRead = userNotifications?.every(
    (notification) => notification.isRead
  );

  // Mark a notification as read
  const readNotificationsHandler = (id) => {
    readNotification(id);
  };

  // If all notifications are read, display a message indicating so
  if (allNotificationsRead)
    return (
      <div className="container max-w-5xl mx-auto flex-col items-center justify-center flex h-[calc(100vh-70px)] overflow-hidden md:h-96 dark:bg-black ">
        <div className="flex flex-col justify-center w-full max-w-md h-[116px] dark:text-white">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-semibold">Nothing to see here yet</h2>
            <p className="text-lg font-medium text-center">
              All caught up! Any new activity on your posts will appear here
            </p>
          </div>
        </div>
      </div>
    );

  // Defining the messages for each notification type and displaying the appropriate message for each type
  const notificationMessages = (notification) => {
    switch (notification.type) {
      case "liked":
        return "liked your post";
      case "followed":
        return "started following you";
      case "commented":
        return `commented: ${notification.commentData} on your post`;
    }
  };

  return (
    <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center dark:bg-black ">
      <div className="flex flex-col justify-center mt-8 w-full max-w-3xl   ">
        {userNotifications?.map(
          (userNotification) =>
            !userNotification.isRead && (
              <div
                key={userNotification.id}
                className="flex items-start gap-2  mb-2 border-b-[1px] border-[#DBDBDB] px-2 py-1 cursor-pointer hover:bg-[#efefef] dark:hover:bg-[#262626]  "
                onClick={() => readNotificationsHandler(userNotification.id)}
              >
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src={userNotification.senderUserPhotoUrl ?? DefaultAvatar}
                  alt={`${userNotification?.senderUserName} profile picture`}
                />

                <div className="break-words w-full">
                  <span className="text-base font-semibold cursor-pointer dark:text-white">
                    {userNotification.senderUserName}
                  </span>
                  <p className="break-all inline ml-1 dark:text-white ">
                    {notificationMessages(userNotification)}
                  </p>
                  <p className="text-sm text-[#71767b] mt-1 md:text-sm dark:text-[#A8A8A8]">
                    {moment
                      .unix(userNotification?.timestamp?.seconds)
                      .format("llll")}
                  </p>
                </div>

                {userNotification.postData && (
                  <div className=" w-20 h-20 md:w-24 md:h-24 ">
                    <img
                      src={userNotification.postData}
                      className=" w-full h-full object-cover"
                      alt="post picture"
                    />
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Notification;

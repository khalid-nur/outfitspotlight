import { useEffect, useState } from "react";
import DefaultAvatar from "../assets/signup-default-avatar.png";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment";
import { useFirebase } from "../hooks/useFirebase";

const Notification = () => {
  const { documents: notificationDocs } = useCollection("notification");
  const { user } = useAuthContext();
  const [userNotifications, setUserNotifications] = useState(null);
  const { readNotification } = useFirebase("notification");

  console.log(notificationDocs);
  console.log(user.uid);

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

  // If all notifications are read, display a message indicating so
  if (allNotificationsRead)
    return (
      <div className="container max-w-5xl mx-auto flex-col items-center justify-center flex h-screen md:h-96 dark:bg-black ">
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

  // Mark a notification as read
  const readNotificationsHandler = (id) => {
    readNotification(id);
  };

  // Defining the messages for each notification type
  const notificationMessages = {
    liked: "liked your post",
    followed: "started following you",
  };

  return (
    <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center dark:bg-black ">
      <div className="flex flex-col justify-center mt-8 w-full max-w-3xl px-3 dark:border-[#262626]">
        {userNotifications?.map(
          (userNotification) =>
            !userNotification.isRead && (
              <div
                key={userNotification.id}
                className="flex items-center justify-between mb-2 border-b-[1px] border-[#DBDBDB] px-2 py-1 cursor-pointer hover:bg-[#efefef] dark:hover:bg-[#121212]"
                onClick={() => readNotificationsHandler(userNotification.id)}
              >
                <div className="flex items-center mb-2 ">
                  <img
                    src={userNotification.senderUserPhotoUrl ?? DefaultAvatar}
                    alt="icon"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col items-start justify-center ml-2">
                    <div className="flex items-center gap-1">
                      <p className="text-base font-semibold cursor-pointer dark:text-white">
                        {userNotification.senderUserName}
                      </p>
                      <span className="font-normal dark:text-white">
                        {notificationMessages[userNotification.type]}
                      </span>
                    </div>
                    <p className="text-sm text-[#71767b] md:text-sm dark:text-[#A8A8A8]">
                      {moment
                        .unix(userNotification?.timestamp?.seconds)
                        .format("llll")}
                    </p>
                  </div>
                </div>
                {userNotification.postData && (
                  <div className="flex items-center justify-end mb-2 dark:text-white">
                    <img
                      src={userNotification.postData}
                      alt="icon"
                      className="w-16 h-16 md:w-20 md:h-20 object-cover"
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

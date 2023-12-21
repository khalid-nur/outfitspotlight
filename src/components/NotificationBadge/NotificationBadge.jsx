import { useState, useEffect } from "react";
import { BsBell, BsBellFill } from "react-icons/bs";
import { useLocation, Link } from "react-router-dom";
import { Badge } from "antd";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

const NotificationBadge = () => {
  let location = useLocation();
  const { documents: notificationDocs } = useCollection("notification");
  const { user } = useAuthContext();
  const [unreadNotificationsCount, setUnreadNotificationsCount] =
    useState(null);

  useEffect(() => {
    // Filtering unread notifications specific to the current user
    const unreadNotifications = notificationDocs?.filter(
      (notification) =>
        notification.recipientUserId === user.uid && !notification.isRead
    );

    // Setting the count of unread notifications
    setUnreadNotificationsCount(unreadNotifications);
  }, [notificationDocs, user.uid]);

  return (
    <>
      <Badge size="small" count={unreadNotificationsCount?.length}>
        {location.pathname.includes("notification") ? (
          <BsBellFill className=" dark:text-white" size={25} />
        ) : (
          <BsBell className="dark:text-white" size={25} />
        )}
      </Badge>
      <p className=" text-xs font-semibold dark:text-white">Notification</p>
    </>
  );
};

export default NotificationBadge;

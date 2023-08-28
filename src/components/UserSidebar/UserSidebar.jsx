import { useState, useEffect } from "react";
import DefaultAvatar from "../../assets/signup-default-avatar.png";

import { RiMoonClearLine } from "react-icons/ri";
import { HiOutlineSun } from "react-icons/hi";

import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const UserSidebar = ({ popUp, togglePopup }) => {
  // Initialize the isDark state by retrieving the value stored in localStorage.
  // If there's no value in localStorage default to false
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) || false
  );

  // Retrieve user object from useAuthContext hook
  const { user } = useAuthContext();

  // Get logout function from useLogout hook for logging out a user
  const { logout } = useLogout();

  //   Toggle dark mode
  const darkMode = () => {
    // Toggle the current value of the dark mode state to get the updated value
    const newIsDark = !isDark;

    // Set the updated value for the dark mode state
    setIsDark(newIsDark);

    // Update localStorage with the updated dark mode state
    localStorage.setItem("isDark", JSON.stringify(newIsDark));
  };

  // Apply the dark class to the html element if isDark is true and remove the class if isDark is false.
  useEffect(() => {
    if (isDark) {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div
      className={`bg-[#f8f7f5] dark:bg-black dark:text-white w-52 h-full md:hidden fixed top-0 right-0  ease-in-out duration-500 ${
        popUp ? "transform translate-x-0 " : "transform translate-x-full "
      }`}
    >
      <div className="flex flex-col items-end my-2">
        <img
          className="w-14 h-14 rounded-full mr-4 cursor-pointer"
          src={user?.photoURL ?? DefaultAvatar}
          alt=""
          onClick={togglePopup}
        />
        <div className="flex flex-col mr-4">
          <h1 className="text-xl font-semibold text-right cursor-pointer">
            {user?.displayName}
          </h1>
          <h2 className="text-xs xl:text-sm cursor-pointer">{user?.email}</h2>
        </div>
      </div>
      <div className="w-full px-4 py-2 border-t border-b-0">
        <ul className="flex flex-col gap-2 items-end">
          <li className="text-black/60 hover:underline hover:underline-offset-4 cursor-pointer dark:text-white">
            Setting
          </li>
          <li className="text-black/60 hover:underline hover:underline-offset-4 cursor-pointer dark:text-white">
            Privacy Policy
          </li>
          <li className="text-black/60 hover:underline hover:underline-offset-4 cursor-pointer dark:text-white">
            Help Center
          </li>
          <li
            className="text-black/60 hover:underline hover:underline-offset-4 cursor-pointer dark:text-white"
            onClick={logout}
          >
            Logout
          </li>
        </ul>
      </div>
      <div className="fixed bottom-4 right-4" onClick={darkMode}>
        {/* Toggle dark mode icon */}
        {!isDark ? (
          <RiMoonClearLine className="cursor-pointer" size={20} />
        ) : (
          <HiOutlineSun className="cursor-pointer  dark:text-white" size={20} />
        )}
      </div>
    </div>
  );
};

export default UserSidebar;

import { useState, useEffect } from "react";
import DefaultAvatar from "../../assets/signup-default-avatar.png";
import { RiMoonClearLine } from "react-icons/ri";
import { HiOutlineSun } from "react-icons/hi";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

const UserDropdown = ({ popUp }) => {
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
      className={`w-[160px] h-[260px] xl:w-[250px] xl:h-[220px] bg-[#f8f7f5]  rounded shadow-md p-2 ${
        popUp ? "opacity-100" : "opacity-0 hidden"
      } transition-opacity duration-300 ease-in-out border dark:border-[#262626] dark:bg-black`}
    >
      <div className="flex flex-col items-baseline xl:flex-row xl:items-center mb-1 ">
        {/* A clickable link to navigate to user profiles */}
        <Link to={`/profile/${user?.uid}`}>
          <img
            className="w-14 h-14 object-cover rounded-full mr-4 cursor-pointer "
            src={user?.photoURL ?? DefaultAvatar}
            alt=""
          />
        </Link>

        <div className="flex flex-col">
          {/* A clickable link to navigate to user profiles */}
          <Link to={`/profile/${user?.uid}`}>
            <h1 className="text-xl font-semibold dark:text-white cursor-pointer">
              {user?.displayName}
            </h1>
          </Link>

          <h2 className="text-xs xl:text-sm dark:text-white cursor-pointer">
            {user?.email}
          </h2>
        </div>
      </div>
      <div className="pt-3 border-t border-b-0">
        <ul className="flex flex-col">
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
        <div className="flex justify-end my-2">
          {/* Toggle dark mode icon */}
          {!isDark ? (
            <RiMoonClearLine
              className="cursor-pointer"
              size={20}
              onClick={darkMode}
            />
          ) : (
            <HiOutlineSun
              className="cursor-pointer dark:text-white"
              size={20}
              onClick={darkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;

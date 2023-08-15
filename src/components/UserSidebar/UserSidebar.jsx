import { useState } from "react";
import DefaultAvatar from "../../assets/signup-default-avatar.png";

import { RiMoonClearLine } from "react-icons/ri";
import { HiOutlineSun } from "react-icons/hi";

const UserSidebar = ({ popUp, togglePopup }) => {
  const [isDark, setIsDark] = useState(true);

  //   Toggle dark mode
  const darkMode = () => {
    if (isDark) {
      // Add "dark" class to the <html> element to enable dark mode
      document.querySelector("html").classList.add("dark");
    } else {
      // Remove "dark" class from the <html> element to disable dark mode
      document.querySelector("html").classList.remove("dark");
    }

    // Toggle the value of 'isDark' state
    setIsDark(!isDark);
  };
  console.log(isDark);
  return (
    <div
      className={`bg-[#f8f7f5] dark:bg-black dark:text-white w-52 h-full md:hidden fixed top-0 right-0  ease-in-out duration-500 ${
        popUp ? "transform translate-x-0 " : "transform translate-x-full "
      }`}
    >
      <div className="flex flex-col items-end my-2">
        <img
          className="w-14 h-14 rounded-full mr-4 cursor-pointer"
          src={DefaultAvatar}
          alt=""
          onClick={togglePopup}
        />
        <div className="flex flex-col mr-4">
          <h1 className="text-xl font-semibold text-right cursor-pointer">
            lifewithjazz
          </h1>
          <h2 className="text-xs xl:text-sm cursor-pointer">
            lifewithjazz@gmail.com
          </h2>
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
          <li className="text-black/60 hover:underline hover:underline-offset-4 cursor-pointer dark:text-white">
            Logout
          </li>
        </ul>
      </div>
      <div className="fixed bottom-4 right-4" onClick={darkMode}>
        {/* Toggle dark mode icon */}
        {isDark ? (
          <RiMoonClearLine className="cursor-pointer" size={20} />
        ) : (
          <HiOutlineSun className="cursor-pointer  dark:text-white" size={20} />
        )}
      </div>
    </div>
  );
};

export default UserSidebar;

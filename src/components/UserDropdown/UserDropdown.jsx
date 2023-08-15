import { useState } from "react";
import DefaultAvatar from "../../assets/signup-default-avatar.png";

import { RiMoonClearLine } from "react-icons/ri";
import { HiOutlineSun } from "react-icons/hi";

import { useLogout } from "../../hooks/useLogout";

const UserDropdown = ({ popUp }) => {
  const [isDark, setIsDark] = useState(true);

  const { logout } = useLogout();

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
      className={`w-[160px] h-[260px] xl:w-[250px] xl:h-[220px]  rounded shadow-md p-2 ${
        popUp ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300 ease-in-out border dark:border-[#262626] dark:bg-black`}
    >
      <div className="flex flex-col items-baseline xl:flex-row xl:items-center mb-1 ">
        <img
          className="w-14 h-14 rounded-full mr-4 cursor-pointer "
          src={DefaultAvatar}
          alt=""
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold dark:text-white cursor-pointer">
            lifewithjazz
          </h1>
          <h2 className="text-xs xl:text-sm dark:text-white cursor-pointer">
            lifewithjazz@gmail.com
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
        <div className="flex justify-end my-2" onClick={darkMode}>
          {/* Toggle dark mode icon */}
          {isDark ? (
            <RiMoonClearLine className="cursor-pointer" size={20} />
          ) : (
            <HiOutlineSun
              className="cursor-pointer dark:text-white"
              size={20}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;

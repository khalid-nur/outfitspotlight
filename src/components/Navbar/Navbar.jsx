import { useState } from "react";
import MainLogo from "../../assets/main-logo.png";
import DefaultAvatar from "../../assets/signup-default-avatar.png";

import UserDropdown from "../UserDropdown/UserDropdown";
import UserSidebar from "../UserSidebar/UserSidebar";

import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { BsBell } from "react-icons/bs";

const Navbar = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  // Display popup
  const displayPopup = () => {
    console.log("clicked");
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-10 dark:bg-black dark:border-[#ABABAB]  ">
      <header className="flex items-center justify-center md:justify-between container mx-auto px-2 py-2 md:px-5 md:py-5 max-w-5xl ">
        <div className=" flex items-center justify-center ">
          <img
            src={MainLogo}
            className="mr-4 w-20 h-9 hidden md:block md:h-10 md:w-[108px] rounded-md"
          />

          <label className="relative hidden md:block ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <AiOutlineSearch className="h-5 w-5  text-[#cbd5e1] dark:text-[#A8A8A8]" />
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block w-60  bg-white  border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 focus:w-[300px] ease-in-out duration-100  text-sm dark:border-[#A8A8A8] dark:text-white dark:bg-[#262626] dark:placeholder-[#A8A8A8]"
              placeholder="Search"
              type="text"
              name="search"
            />
          </label>
        </div>
        <nav className="flex items-center justify-center   sm:divide-x ">
          <div className=" relative flex items-center justify-center   gap-x-4 md:gap-x-8 ">
            <div className="flex flex-col items-center p-1 md:p-0 cursor-pointer ">
              <AiOutlineHome className="dark:text-white" size={25} />
              <p className=" text-xs font-semibold dark:text-white">Home</p>
            </div>
            <div className="flex flex-col items-center p-1 md:p-0 cursor-pointer">
              <AiOutlineCompass className="dark:text-white" size={25} />
              <p className=" text-xs font-semibold dark:text-white">Explore</p>
            </div>
            <div className="flex flex-col items-center p-1 md:p-0 cursor-pointer md:hidden dark:text-white">
              <AiOutlinePlusSquare
                className=" cursor-pointer dark:text-white"
                size={25}
              />
              <p className=" text-xs font-semibold dark:text-white">Post</p>
            </div>
            <div className="flex flex-col items-center p-1 md:p-0 cursor-pointer md:hidden">
              <AiOutlineSearch className="dark:text-white" size={25} />
              <p className=" text-xs font-semibold dark:text-white">Search</p>
            </div>
            <div className="flex flex-col items-center p-1 md:p-0 cursor-pointer">
              <BsBell className="dark:text-white" size={25} />
              <p className=" text-xs font-semibold dark:text-white">
                Notification
              </p>
            </div>

            <div className="  w-11 h-11  md:w-14 md:h-14 flex justify-center items-center rounded-full bg-gray-500 text-xl text-white cursor-pointer ">
              <img
                src={DefaultAvatar}
                className="  w-full h-full rounded-full"
                onClick={displayPopup}
              />
            </div>

            {/* Dropdown menu */}
            <div className=" hidden absolute right-0 top-[70px] md:block  ">
              <UserDropdown popUp={popupVisible} />
            </div>

            {/* slide-out menu */}
            <div>
              <UserSidebar popUp={popupVisible} togglePopup={displayPopup} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

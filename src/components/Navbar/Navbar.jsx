import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import MainLogo from "../../assets/main-logo.png";
import DefaultAvatar from "../../assets/signup-default-avatar.png";

import UserDropdown from "../UserDropdown/UserDropdown";
import UserSidebar from "../UserSidebar/UserSidebar";
import PostFeedButton from "../PostFeedButton/PostFeedButton";

import {
  AiOutlineHome,
  AiTwotoneHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiFillCompass,
} from "react-icons/ai";

import { useAuthContext } from "../../hooks/useAuthContext";
import NotificationBadge from "../NotificationBadge/NotificationBadge";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const { user } = useAuthContext();

  const location = useLocation();

  // Display popup
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const showSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-20 dark:bg-black dark:border-[#ABABAB]   ">
      <header className="flex items-center justify-center md:justify-between container mx-auto px-2 py-2 md:px-5 md:py-5 max-w-5xl ">
        <div className=" flex items-center  justify-center ">
          <img
            src={MainLogo}
            className="mr-4 w-20 h-9 hidden md:block md:h-10 md:w-[108px] rounded-md"
            alt="outfitspotlight logo"
          />
          <div className="hidden relative md:block">
            <SearchBar />
          </div>
        </div>
        <nav className="flex items-center justify-center   sm:divide-x ">
          <div className=" relative flex items-center justify-center   gap-x-4 md:gap-x-8 ">
            <Link to={"/home"}>
              <div className="flex flex-col items-center p-1 md:p-0 cursor-pointer ">
                {location.pathname.includes("home") ? (
                  <AiTwotoneHome className="dark:text-white" size={25} />
                ) : (
                  <AiOutlineHome className="dark:text-white" size={25} />
                )}
                <p className=" text-xs font-semibold dark:text-white">Home</p>
              </div>
            </Link>

            <Link to={"/explore"}>
              <div className="flex flex-col items-center p-1 md:p-0 cursor-pointer">
                {location.pathname.includes("explore") ? (
                  <AiFillCompass className="dark:text-white" size={25} />
                ) : (
                  <AiOutlineCompass className="dark:text-white" size={25} />
                )}
                <p className=" text-xs font-semibold dark:text-white">
                  Explore
                </p>
              </div>
            </Link>

            <div className="flex flex-col items-center p-1 md:p-0 cursor-pointer md:hidden dark:text-white">
              <PostFeedButton />
              <p className=" text-xs font-semibold dark:text-white">Post</p>
            </div>
            <div
              className="flex flex-col items-center p-1 md:p-0 cursor-pointer md:hidden"
              onClick={showSearchBar}
            >
              <AiOutlineSearch className="dark:text-white" size={25} />
              <p className=" text-xs font-semibold dark:text-white">Search</p>
            </div>

            <Link to={"/notification"}>
              <div className="flex flex-col items-center p-1 md:p-0 cursor-pointer">
                <NotificationBadge />
              </div>
            </Link>

            <div className="  w-11 h-11  md:w-14 md:h-14 flex justify-center items-center rounded-full bg-[#efefef] text-xl text-white cursor-pointer ">
              <img
                className="  w-full h-full object-cover rounded-full"
                src={user?.photoURL ?? DefaultAvatar}
                alt={`${user?.displayName} profile picture`}
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
        {/* Search bar when in mobile mode */}
        <div
          className={`md:hidden absolute top-0 w-full left-0 right-0 transform ${
            isSearchBarVisible ? "translate-y-16" : "-translate-y-full"
          } transition-transform ease-in-out duration-500 -z-10`}
        >
          <SearchBar />
        </div>
      </header>
    </div>
  );
};

export default Navbar;

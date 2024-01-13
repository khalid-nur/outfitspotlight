import { useState, useEffect } from "react";
import DefaultAvatar from "../../assets/signup-default-avatar.png";
import { AiOutlineSearch } from "react-icons/ai";
import { useCollection } from "../../hooks/useCollection";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { documents: userDocs } = useCollection("users");
  useEffect(() => {
    const searchString = searchInput.toLowerCase();

    // Check if search string is not empty
    if (searchString) {
      // If search string is not empty filter the list of usernames from userDocs based on searchString
      const matchedUsers = userDocs.filter((user) =>
        user.username.toLowerCase().startsWith(searchString)
      );
      // Update searchResults with matched users
      setSearchResults(matchedUsers);
    } else {
      // if search input is empty clear search results
      setSearchResults([]);
    }
  }, [userDocs, searchInput]);

  //   When a user clicks away from the search input dropdown closes and delays it to provide
  //   a short buffer period to allow user to click found username
  const searchBlurHandler = () => {
    setTimeout(() => {
      setShowDropdown(false);
      setSearchInput("");
    }, 100);
  };

  return (
    <>
      <label className="md:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <AiOutlineSearch className="h-5 w-5 text-[#cbd5e1] dark:text-[#A8A8A8]" />
        </span>
        <input
          className="placeholder:italic placeholder:text-slate-400 block w-full bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm outline-none md:w-52 lg:w-60 focus:outline-none md:focus:w-60 lg:focus:w-80 ease-in-out duration-100 text-base dark:border-[#A8A8A8] dark:text-white dark:bg-[#262626] dark:placeholder-[#A8A8A8]"
          placeholder="Search"
          type="text"
          name="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={searchBlurHandler}
        />
        {showDropdown && (
          <div className="absolute bg-[#f8f7f5] shadow-lg max-h-60 w-full overflow-y-scroll dark:text-white dark:bg-[#262626] z-10">
            {searchResults && searchResults.length > 0
              ? searchResults.map((searchResult, index) => (
                  <Link to={`/profile/${searchResult.id}`} key={index}>
                    <div
                      className="p-2 cursor-pointer hover:bg-[#efefef] dark:hover:bg-[#121212]"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="flex items-center gap-1">
                        <img
                          className="h-10 w-10 object-cover rounded-full"
                          src={searchResult?.photoURL ?? DefaultAvatar}
                          alt={`${searchResult?.username} profile picture`}
                        />
                        {searchResult.username}
                      </span>
                    </div>
                  </Link>
                ))
              : searchInput && (
                  <div className="py-3 text-center">No results found</div>
                )}
          </div>
        )}
      </label>
    </>
  );
};

export default SearchBar;

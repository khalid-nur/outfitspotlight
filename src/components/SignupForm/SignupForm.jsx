import { useState } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useSignup } from "../../hooks/useSignup";

import DefaultAvatar from "../../assets/signup-default-avatar.png";
import Loader from "../Loader/Loader";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(DefaultAvatar);
  const [customError, setCustomError] = useState({
    username: "",
    image: "",
  });
  const { signup, isPending, error } = useSignup();

  const submitHandler = (e) => {
    e.preventDefault();

    setCustomError((prevError) => ({ ...prevError, username: "" })); // Clear the 'username' error message.

    // Check if the length of the username is less than 3 characters.
    if (username.length < 3) {
      setCustomError((prevError) => ({
        ...prevError,
        username: "Username must be at least three characters long", // Set the 'username' error message.
      }));
      return;
    }

    // If the username is valid, proceed with the signup process.
    signup(username, email, password);
  };

  const imageChangeHandler = (e) => {
    const selectedImage = e.target.files[0]; // Get the selected image from the input

    if (selectedImage) {
      setCustomError(null); // Clear any previous error message
      setThumbnail(DefaultAvatar); // Set the default thumbnail image

      const reader = new FileReader();

      // Check if the selected file is not an image
      if (!selectedImage.type.includes("image")) {
        setThumbnailPreview(DefaultAvatar); // Set a default image preview
        setThumbnail(null); // Clear the thumbnail

        setCustomError((prevError) => ({
          ...prevError,
          image: "Invalid image", // Set the error message for invalid image
        }));

        return;
      }

      // When the image is valid
      reader.onload = () => {
        setThumbnailPreview(reader.result); // Display the selected image preview
      };

      reader.readAsDataURL(selectedImage); // Read/process the selected image
      setThumbnail(selectedImage); // Set the thumbnail image
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label className="text-sm font-medium leading-5" htmlFor="username">
          Username
        </label>

        <div className="mt-1 rounded-md shadow-sm">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            id="username"
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        {/* Display 'username' validation error */}
        {customError?.username && (
          <div className="text-red-600 text-sm mt-1">
            {customError.username}
          </div>
        )}
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium leading-5" htmlFor="email">
          Email
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            id="email"
            name="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* Display error for existing email  */}
        {error && error.includes("auth/email-already-in-use") && (
          <div className="text-red-600 text-sm mt-1">
            Email already exists. Please use a different email.
          </div>
        )}
      </div>

      <div className="mt-6">
        <label
          className="text-sm font-medium text-gray-700 leading-5"
          htmlFor="password"
        >
          Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            id="password"
            type="password"
            autoComplete="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {/* Display error for weak password */}
        {error && error.includes("auth/weak-password") && (
          <div className="text-red-600 text-sm mt-1">
            Password should consist of at least 6 characters
          </div>
        )}
      </div>

      <div className=" relative flex items-center justify-between mt-6">
        <img
          className="  rounded-full inline-block  w-16 h-16 object-cover object-center border-3 border-teal-500 mr-4 align-middle"
          src={thumbnailPreview || DefaultAvatar}
          alt="default avatar"
        />

        {/* Display image error message */}
        <div className=" absolute -top-3 left-14">
          {customError?.image && (
            <div className="flex items-center gap-1 text-sm border border-red-600 px-1 rounded-full">
              <BsFillExclamationCircleFill className="text-red-600" />{" "}
              {customError.image}
            </div>
          )}
        </div>
        <div className=" align-middle">
          <label
            className="  bg-blue-500 text-white text-center py-2 px-4 rounded-md  text-sm font-semibold cursor-pointer"
            htmlFor="fileInput"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={imageChangeHandler}
          />
        </div>
      </div>

      <div className="mt-6">
        <span className="w-full rounded-md shadow-sm">
          <button
            className={`"flex justify-center w-full px-4 py-2 md:text-lg font-medium text-white bg-[#0095F6] border border-transparent rounded-full  focus:outline-none transition duration-150 ease-in-out  ${
              customError?.image ? "cursor-not-allowed " : "cursor-pointer "
            } "`}
            type="submit"
            disabled={!!customError?.image} // Disable the button if there is an 'image' validation error
          >
            {/* Display a loading if the signup is pending */}
            {isPending ? (
              <div className="text-white">
                <Loader />
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </span>
      </div>
    </form>
  );
};

export default SignupForm;

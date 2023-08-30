import { useState, useRef, useEffect } from "react";
import { Button, Modal, Input } from "antd";
import { IoMdClose } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import TourInfo from "../TourInfo/TourInfo";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";
import { serverTimestamp } from "firebase/firestore";
import { useFirebase } from "../../hooks/useFirebase";
import { useAuthContext } from "../../hooks/useAuthContext";

const PostFeedModal = ({ isModalVisible, setModalVisible }) => {
  const [nestedVisible, setNestedVisible] = useState(false);
  const [parentInputText, setParentInputText] = useState("");
  const [parentInputFile, setParentInputFile] = useState(null);
  const [nestedValues, setNestedValues] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [nestedImagePreviewUrls, setNestedImagePreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Refs for DOM elements
  const inputTextRef = useRef(null);
  const postImageRef = useRef(null);
  const addProductsButtonRef = useRef(null);
  const insertUrlRef = useRef(null);
  const uploadImageRef = useRef(null);
  const removeItemButtonRef = useRef(null);
  const addNewItemButtonRef = useRef(null);
  const saveItemsButtonRef = useRef(null);

  const refs = {
    inputTextRef,
    postImageRef,
    addProductsButtonRef,
    insertUrlRef,
    uploadImageRef,
    removeItemButtonRef,
    addNewItemButtonRef,
    saveItemsButtonRef,
  };

  const { user } = useAuthContext();
  const { addDocument, response } = useFirebase("posts");

  // Hides the parent modal and resets its state
  const hideParentModal = () => {
    setModalVisible(false);
    setParentInputText("");
    setParentInputFile(null);
    setNestedValues([]);
    setImagePreviewUrl(null);
    setNestedImagePreviewUrls([]);
  };

  // Shows the nested modal
  const showNestedModal = () => {
    // Check if the nestedValues state is empty (first time opening Nested Modal)
    if (nestedValues?.length === 0) {
      // Set some default nested values
      const defaultNestedValues = [
        { nestedInputText: "", nestedInputFile: null },
      ];
      setNestedValues(defaultNestedValues);
    }
    setNestedVisible(true);
  };

  // Hides the nested modal
  const hideNestedModal = () => {
    setNestedVisible(false);
  };

  // Handles parent input text change
  const handleParentInputTextChange = (e) => {
    setParentInputText(e.target.value);
  };

  // Handles parent input file change and creates image preview
  const handleParentInputFileChange = (e) => {
    // Gets selected file
    const file = e.target.files[0];

    setParentInputFile(file); // Updates parent input file

    // Read the selected file to create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result); // Updates image preview URL with the selected file
    };
    if (file) {
      reader.readAsDataURL(file); // Reads the file to generate image preview
    } else {
      setImagePreviewUrl(null); // Clears image preview URL if no file is selected
    }
  };

  // Adds a new nested value
  const handleAddNestedValue = () => {
    const nestedValue = { nestedInputText: "", nestedInputFile: null }; // Creates a new nested value
    setNestedValues([...nestedValues, nestedValue]); // Adds the new nested value to the array
  };

  // Handles nested input text change
  const handleNestedInputTextChange = (index, e) => {
    const updatedNestedValues = [...nestedValues]; // Creates a copy of nested values array
    updatedNestedValues[index].nestedInputText = e.target.value; // Updates the nested input text at the specified index
    setNestedValues(updatedNestedValues); // Updates the nested values array
  };

  // Handles nested input file change and creates image preview
  const handleNestedInputFileChange = (index, e) => {
    const file = e.target.files[0]; // Gets selected file

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedPreviewUrls = [...nestedImagePreviewUrls]; // Creates a copy of image preview URLs array
      updatedPreviewUrls[index] = reader.result; // Updates the preview URL at the specified index
      setNestedImagePreviewUrls(updatedPreviewUrls); // Updates the image preview URLs array
    };

    if (file) {
      reader.readAsDataURL(file); // Reads the file to generate image preview
    } else {
      const updatedPreviewUrls = [...nestedImagePreviewUrls]; // Creates a copy of image preview URLs array
      updatedPreviewUrls[index] = null; // Clears the preview URL at the specified index
      setNestedImagePreviewUrls(updatedPreviewUrls); // Updates the image preview URLs array
    }

    const updatedNestedValues = [...nestedValues]; // Creates a copy of nested values array
    updatedNestedValues[index].nestedInputFile = file; // Updates the nested input file at the specified index
    setNestedValues(updatedNestedValues); // Updates the nested values array
  };

  // Removes a nested value
  const handleRemoveNestedValue = (index) => {
    const updatedNestedValues = [...nestedValues]; // Creates a copy of nested values array
    updatedNestedValues.splice(index, 1); // Removes the nested value at the specified index
    setNestedValues(updatedNestedValues); // Updates the nested values array

    // Remove the corresponding preview image URL for the removed nested value
    const updatedPreviewUrls = [...nestedImagePreviewUrls]; // Creates a copy of image preview URLs array
    updatedPreviewUrls.splice(index, 1); // Removes the preview URL at the specified index
    setNestedImagePreviewUrls(updatedPreviewUrls); // Updates the image preview URLs array
  };

  // Removes the image preview
  const handleRemoveImagePreview = () => {
    setImagePreviewUrl(null); // Clears the image preview URL
    setParentInputFile(null); // Clears the parent input file
  };

  // Handling submission of the parent modal form
  const handleParentModalSubmit = async (e) => {
    e.preventDefault();
    console.log("Parent Input Text:", parentInputText);
    console.log("Parent Input File:", parentInputFile);
    console.log("Nested Values:", nestedValues);

    // Set loading state
    setLoading(true);

    // Prepare promises for uploading nested files and processing their results
    const nestedUploadPromises = nestedValues.map(async (nestedValue) => {
      if (nestedValue.nestedInputFile) {
        // Construct the path for the nested file upload
        const nestedUploadPath = `productImages/${user.uid}/${nestedValue.nestedInputFile.name}`;
        // Upload the nested file and get its URL
        await uploadBytes(
          ref(storage, nestedUploadPath),
          nestedValue.nestedInputFile
        );
        const nestedImgUrl = await getDownloadURL(
          ref(storage, nestedUploadPath)
        );
        return {
          // Return the text and URL for the nested input
          nestedInputText: nestedValue.nestedInputText,
          nestedInputFileUrl: nestedImgUrl,
        };
      }
      return {
        // If no nested file, return text and null URL
        nestedInputText: nestedValue.nestedInputText,
        nestedInputFileUrl: null,
      };
    });

    // Wait for all nested file uploads to complete
    const nestedResults = await Promise.all(nestedUploadPromises);

    // Prepare an array of nested product data with text and URLs
    const nestedProduct = nestedResults.map((result) => ({
      nestedInputText: result.nestedInputText,
      nestedInputFileUrl: result.nestedInputFileUrl,
    }));

    // Construct the path for the parent file upload
    const uploadPath = `postImages/${user.uid}/${parentInputFile.name}`;
    // Upload the parent file and get its URL
    await uploadBytes(ref(storage, uploadPath), parentInputFile);
    const imgUrl = await getDownloadURL(ref(storage, uploadPath));

    // Create an object representing the post data
    const post = {
      status: parentInputText, // Set the status text from parent input
      timestamp: serverTimestamp(), // Get the current server timestamp
      comments: [], // Initialize comments array
      username: user.displayName, // Set username from user's display name
      photoURL: user.photoURL, // Set photo URL from user's profile
      userId: user.uid, // Set user ID
      postImg: imgUrl, // Set the URL of the uploaded parent image
      product: nestedProduct, // Attach the nested product information
    };

    // Simulate loading delay and then add the post document to Firestore
    setTimeout(() => {
      setLoading(false); // Set loading state to false
      addDocument(post); // Add the post document to Firestore
    }, 2000);

    console.log(post);
  };

  //   handle the response and reset the parent modal
  useEffect(() => {
    console.log(response);

    // If the operation was successful in the response
    if (response.success) {
      hideParentModal(); // If successful, hide the parent modal / reset the parent modal
    }
  }, [response.success]);

  return (
    <div>
      {/* Parent Modal */}
      <Modal
        className=" overflow-hidden"
        open={isModalVisible}
        onCancel={hideParentModal}
        footer={[
          <div
            className=" flex items-center justify-between mx-auto"
            key={"footerContainer"}
          >
            {/* // Button to trigger image upload input */}
            <label
              key={"picIcon"}
              className=" cursor-pointer opacity-100"
              htmlFor="picLoad"
            >
              <div ref={postImageRef}>
                <IoImageOutline
                  className="  bottom-5 bg-[#f3f2ef] text-[#666] p-2 rounded-full"
                  key={"imageIcon"}
                  size={40}
                />
              </div>
            </label>
            <div className="flex justify-end">
              {/* , // Button to open the nested modal */}
              <Button
                ref={addProductsButtonRef}
                key="nestedModal"
                onClick={showNestedModal}
              >
                Add Products
              </Button>
              {/* , // Button to submit the parent modal */}
              <Button
                key="submit"
                type="primary"
                className="bg-[#3F96FE] text-white py-1 px-4 ml-1 border  transition-none rounded-md"
                onClick={handleParentModalSubmit}
                disabled={parentInputFile ? false : true}
              >
                {loading ? <div>{<ButtonLoader />}</div> : "Post"}
              </Button>
            </div>
          </div>,
        ]}
      >
        <TourInfo refs={refs} stepSet={1} />

        {/* Textarea for entering parent input */}
        <textarea
          className=" mt-4 h-32 w-full outline-none resize-none text-base"
          value={parentInputText}
          onChange={handleParentInputTextChange}
          placeholder="Create a post"
          ref={inputTextRef}
        />
        {/* Input for uploading parent image */}
        <input
          className=" opacity-0"
          id="picLoad"
          type="file"
          accept="image/*"
          onChange={handleParentInputFileChange}
        />
        {/* Display parent image preview */}
        {imagePreviewUrl && (
          <div className=" relative w-1/2">
            {imagePreviewUrl && (
              <img
                className=" rounded-md"
                src={imagePreviewUrl}
                alt="Preview"
              />
            )}
            <IoMdClose
              className=" absolute top-1 right-1 text-white bg-[#0f1419] bg-opacity-70 rounded-full cursor-pointer "
              size={20}
              onClick={handleRemoveImagePreview}
            >
              Remove Image
            </IoMdClose>
          </div>
        )}
      </Modal>

      {/* Nested Modal */}
      <Modal
        className=" overflow-hidden"
        open={nestedVisible}
        onCancel={hideNestedModal}
        footer={[
          <Button
            key="add"
            type="default"
            ref={addNewItemButtonRef}
            onClick={handleAddNestedValue}
          >
            Add New Item
          </Button>,
          <button
            className="bg-[#3F96FE] text-white py-1 px-4 ml-1 border rounded-md"
            ref={saveItemsButtonRef}
            key="save"
            onClick={hideNestedModal}
          >
            Save
          </button>,
        ]}
      >
        <TourInfo refs={refs} stepSet={2} />

        <div className=" h-60 max-h-60 mt-2 overflow-y-auto overflow-x-hidden snap-y">
          <h3 className="mb-2 text-sm font-medium">Products Items:</h3>
          {/* Mapping through the array of nested values */}
          {nestedValues?.map((nestedValue, index) => (
            <div className="relative mt-3 " key={index}>
              <input
                className=" snap-start w-full py-1 px-2 rounded-md border focus:outline-none border-black/30 "
                type="url"
                value={nestedValue.nestedInputText}
                ref={insertUrlRef}
                onChange={(e) => handleNestedInputTextChange(index, e)}
                placeholder="Insert URL"
              />

              <div className="flex items-center justify-between mt-2 mb-2">
                {/* Button for uploading an image for the nested product */}
                <label
                  className="  rounded-full bg-[#D7DFEB] text-[#285191] py-2 px-4 cursor-pointer"
                  ref={uploadImageRef}
                >
                  <input
                    className="hidden"
                    id={`productFile_${index}`}
                    type="file"
                    accept="image/*"
                    // ref={uploadImageRef}
                    onChange={(e) => handleNestedInputFileChange(index, e)}
                  />
                  Upload Image
                </label>

                {/* Button for removing the nested product */}
                <button
                  className="text-white bg-[#D0485F] py-2 px-4  rounded-full"
                  type="danger"
                  ref={removeItemButtonRef}
                  onClick={() => handleRemoveNestedValue(index)}
                >
                  Remove
                </button>
              </div>

              {/* Display nested product image preview */}
              {nestedImagePreviewUrls[index] && (
                <img
                  className=" w-40 ml-auto"
                  src={nestedImagePreviewUrls[index]}
                  alt="Preview"
                />
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default PostFeedModal;

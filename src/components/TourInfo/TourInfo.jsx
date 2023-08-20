import React, { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Tour } from "antd";

const TourInfo = ({ refs, stepSet }) => {
  const [open, setOpen] = useState(false);

  // Tour Info Steps
  const tourSteps1 = [
    {
      title: "Create a Caption",
      description:
        "Write a short caption that explains the products in your post.",
      target: () => refs.inputTextRef.current,
    },
    {
      title: "Choose a Picture",
      description: "Pick a picture that shows the products you want to share.",
      target: () => {
        return refs.postImageRef.current?.lastChild;
      },
    },
    {
      title: "Add Products to Your Post",
      description: "Put specific items in your post.",
      target: () => refs.addProductsButtonRef.current,
    },
  ];

  const tourSteps2 = [
    {
      title: "Put in a Items Url",
      description:
        "Insert the right web address to lead people to the correct item's page.",
      target: () => refs.insertUrlRef.current,
    },
    {
      title: "Share a Picture",
      description: "Upload a picture of the item you want to show.",
      target: () => refs.uploadImageRef.current,
    },
    {
      title: "Take Out an Item",
      description:
        "If you don't want to show something anymore, remove it from your list.",
      target: () => refs.removeItemButtonRef.current,
    },
    {
      title: "Add a New Item",
      description:
        "Add another item to the list of products you're showcasing.",
      target: () => refs.addNewItemButtonRef.current,
    },
    {
      title: "Save Your Items",
      description: "Keep all your product items saved and ready.",
      target: () => refs.saveItemsButtonRef.current,
    },
  ];

  // Determine which set of tour steps to use
  const steps = stepSet === 1 ? tourSteps1 : tourSteps2;

  return (
    <div>
      <AiOutlineQuestionCircle
        className=" cursor-pointer dark:text-white"
        size={20}
        onClick={() => setOpen(true)}
      />
      <Tour
        type="primary"
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
      />
    </div>
  );
};

export default TourInfo;

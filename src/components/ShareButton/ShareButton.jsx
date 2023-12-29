import { useState } from "react";
import { Button, Modal } from "antd";
import {
  TwitterShareButton,
  XIcon,
  FacebookIcon,
  FacebookShareButton,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { TbLink } from "react-icons/tb";

const ShareButton = ({ postData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Receives the Base URL
  const baseUrl = window.location.origin;

  // Default message for sharing
  const defaultTitle =
    " Discover the Newest Trend in Fashion! Explore Our Unique Collection at #OutfitSpotlight! Visit now:";

  // Copy the product link to the clipboard
  const copyHandler = (id) => {
    const productLink = `${baseUrl}/product/${id}`;
    navigator.clipboard.writeText(productLink);

    handleCancel();
  };
  return (
    <>
      <IoPaperPlaneOutline size={24} onClick={showModal} />
      <Modal centered open={isModalOpen} onCancel={handleCancel} footer="">
        <div className="flex justify-center">
          <h1 className="text-base font-semibold dark:text-white">
            Share to...
          </h1>
        </div>
        <div className="flex items-center py-3 gap-9">
          <FacebookShareButton
            url={`${baseUrl}/product/${postData.id}`}
            title={defaultTitle}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>

          <TwitterShareButton
            url={`${baseUrl}/product/${postData.id}`}
            title={defaultTitle}
            hashtags={[
              "Outfitspotlight",
              "TrendsettingStyles",
              "MustHaveFashion",
            ]}
          >
            <XIcon size={40} round={true} />
          </TwitterShareButton>

          <EmailShareButton
            url={`${baseUrl}/product/${postData.id}`}
            body={defaultTitle}
          >
            <EmailIcon size={40} round={true} />
          </EmailShareButton>

          <TbLink
            className="cursor-pointer rounded-full bg-[#7f7f7f] py-2 text-white"
            size={40}
            aria-label="Copy Product Link"
            onClick={() => {
              copyHandler(postData.id);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default ShareButton;

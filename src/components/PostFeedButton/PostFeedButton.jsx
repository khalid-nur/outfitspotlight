import { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import PostFeedModal from "../PostFeedModal/PostFeedModal";

const PostFeedButton = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Shows the parent modal
  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <div>
      {/* Post Button visible on larger screens */}
      <div
        className="hidden md:block py-2  cursor-pointer  "
        onClick={showModal}
      >
        Start a post
      </div>
      {/* Post Button visible on smaller screens */}
      <div className="md:hidden cursor-pointer" onClick={showModal}>
        <AiOutlinePlusSquare size={25} />
      </div>

      <PostFeedModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </div>
  );
};

export default PostFeedButton;

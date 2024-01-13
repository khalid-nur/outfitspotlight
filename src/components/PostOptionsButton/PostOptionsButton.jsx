import { BsThreeDots } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { Dropdown, Space } from "antd";
import FollowButton from "../FollowButton/FollowButton";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirebase } from "../../hooks/useFirebase";

const PostOptionsButton = ({ postData }) => {
  const { user } = useAuthContext(); // Getting the current user
  const { deletePost } = useFirebase("posts");

  // Delete the current post based on its Id
  const deleteHandler = () => {
    deletePost(postData.id);
  };
  const items = [
    {
      // Show delete option only if the post belongs to the current user
      label: postData.userId === user.uid && (
        <p
          className=" flex items-center  gap-1  text-red-500 text-xs font-medium"
          onClick={deleteHandler}
        >
          <FaRegTrashAlt />
          Delete
        </p>
      ),
      key: "0",
    },
    {
      label: postData.userId !== user.uid && (
        <FollowButton postData={postData} />
      ),
      key: "1",
    },
  ];
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <Space>
          <BsThreeDots
            size={20}
            className=" cursor-pointer"
            onClick={(e) => e.preventDefault()}
          />
        </Space>
      </Dropdown>
    </>
  );
};

export default PostOptionsButton;

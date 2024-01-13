import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import DefaultAvatar from "../../assets/signup-default-avatar.png";
import { getCurrentTimeStamp } from "../../helpers/useMoment";

const Comments = ({ postId }) => {
  const [commentList, setCommentList] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const { documents: commentDocs } = useCollection(
    "comments",
    "timeStamp",
    "asc"
  );

  useEffect(() => {
    // Filtering the comments that belong to the current post
    const postComments = commentDocs?.filter(
      (comments) => comments?.postId === postId
    );

    // Updating the state with the filtered comments
    setCommentList(postComments);
  }, [commentDocs]);

  return (
    <>
      {/* Display comments based on showComments state or if there are 5 or less */}
      {showComments || commentList?.length <= 5
        ? commentList?.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start py-2 gap-2 w-full"
            >
              <img
                className="w-8 h-8 object-cover rounded-full"
                src={comment.senderUserPhotoUrl ?? DefaultAvatar}
                alt={`${comment.senderUserName} profile picture`}
              />
              <div className="comment-content break-words flex-wrap">
                <span className="text-base font-semibold cursor-pointer dark:text-white">
                  {comment.senderUserName}
                </span>
                <p className="break-all inline ml-1 dark:text-white">
                  {comment.comment}
                </p>
                <p className="text-sm text-[#71767b] mt-1 md:text-sm dark:text-[#A8A8A8]">
                  {getCurrentTimeStamp(comment.timeStamp)}
                </p>
              </div>
            </div>
          ))
        : null}

      {/* Button to toggle showing all comments */}
      {commentList?.length > 5 && (
        <div>
          {showComments ? (
            <p
              className="cursor-pointer text-[#71767b]"
              onClick={() => setShowComments(false)}
            >
              see less comments
            </p>
          ) : (
            <p
              className="cursor-pointer text-[#71767b]"
              onClick={() => setShowComments(true)}
            >
              View all {commentList?.length} comments
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Comments;

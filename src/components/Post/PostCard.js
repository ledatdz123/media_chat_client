import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import "./PostCard.css";
import CommentModal from "../Comment/CommentModal";
import { useDisclosure } from "@chakra-ui/react";
const PostCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [isSavedPost, setIsSavedPost] = useState(false);

  const {isOpen, onOpen, onClose}=useDisclosure()
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handLikedPost = () => {
    setIsLikedPost(!isLikedPost);
  };
  const handSavedPost = () => {
    setIsSavedPost(!isSavedPost);
  };
  const handleOpenCommentModal=()=>{
    onOpen()
  }
  return (
    <div>
      <div className="border rounded-md w-full">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center space-x-2">
            <img
              className="h-12 w-12 rounded-full"
              src="https://cdn.pixabay.com/photo/2018/03/12/12/32/woman-3219507_1280.jpg"
            />
            <div>
              <p className="font-semibold text-sm">username</p>
              <p className="font-thin text-sm">location</p>
            </div>
          </div>
          <div className="dropdown">
            <BsThreeDots className="dots" onClick={handleDropdown} />
            <div className="dropdown-content">
              {showDropdown && (
                <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer">
                  Delete
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <img
            className="w-full"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          />
        </div>
        <div className="flex justify-between items-center py-4 px-5">
          <div className="flex items-center space-x-2">
            {isLikedPost ? (
              <AiFillHeart
                className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
                onClick={handLikedPost}
              />
            ) : (
              <AiOutlineHeart
                className="text-2xl hover:opacity-50 cursor-pointer"
                onClick={handLikedPost}
              />
            )}
            <FaRegComment onClick={handleOpenCommentModal} className="text-xl hover:opacity-50 cursor-pointer"/>
            <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer"/>
          </div>
          <div>
            {isSavedPost ? (
              <BsBookmarkFill
                className="text-2xl hover:opacity-50 cursor-pointer"
                onClick={handSavedPost}
              />
            ) : (
              <BsBookmark
                className="text-2xl hover:opacity-50 cursor-pointer"
                onClick={handSavedPost}
              />
            )}
          </div>
        </div>
        <div className="w-full py-2 px-5">
          <p>10 likes</p>
          <p className="opacity-50 cursor-pointer">view all 10 comments</p>
        </div>
        <div className="border border-t w-full">
          <div className="flex w-full items-center px-5">
            <BsEmojiSmile/>
            <input className="commentInput" type="text" placeholder="Add comment..."/>
          </div>
        </div>
      </div>
      <CommentModal 
      isLikedPost={isLikedPost} 
      isSavedPost={isSavedPost}
      handLikedPost={handLikedPost} 
      handSavedPost={handSavedPost}
      isOpen={isOpen} 
      onClose={onClose}/>
    </div>
  );
};

export default PostCard;

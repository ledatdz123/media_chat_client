import React, { useEffect, useState } from "react";
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import "./PostCard.css";
import CommentModal from "../Comment/CommentModal";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { likePostAction, savePostAction, unLikePostAction, unSavePostAction } from "../../Redux/Post/Action";
import { isPostLikedByUser, isSavedPostByUser } from "../../config/Logic";
import { useNavigate } from "react-router-dom";
const PostCard = ({post}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [isSavedPost, setIsSavedPost] = useState(false);

  const {isOpen, onOpen, onClose}=useDisclosure()
  const token=localStorage.getItem("tokenChat")
  const {auth}=useSelector((store)=>store)
  const data={
    jwt:token,
    postId: post?.id
  }
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handLikedPost = () => {
    setIsLikedPost(true);
    dispatch(likePostAction(data))
  };
  const handUnLikedPost = () => {
    setIsLikedPost(false);
    dispatch(unLikePostAction(data))
  };
  const handSavedPost = () => {
    setIsSavedPost(true);
    dispatch(savePostAction(data))
  };
  const handUnSavedPost = () => {
    setIsSavedPost(false);
    dispatch(unSavePostAction(data))
  };
  const handleOpenCommentModal=()=>{
    navigate(`/post/${post?.id}`)
    onOpen()
  }

  useEffect(()=>{
    setIsLikedPost(isPostLikedByUser(post, auth.reqUser?.userId))
    setIsSavedPost(isSavedPostByUser(auth.reqUser, post?.id))
  },[post.likeByUsers, auth.reqUser])
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
              <p className="font-semibold text-sm">{post.user?.username}</p>
              <p className="font-thin text-sm">{post?.location}</p>
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
            src={post?.image}
          />
        </div>
        <div className="flex justify-between items-center py-4 px-5">
          <div className="flex items-center space-x-2">
            {isLikedPost ? (
              <AiFillHeart
                className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
                onClick={handUnLikedPost}
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
                onClick={handUnSavedPost}
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
          {post.likeByUsers.length>0 && <p>{post.likeByUsers.length} likes</p>}
          {post.comment.length>0 && <p className="opacity-50 cursor-pointer">view all {post.comment.length} comments</p>}
        </div>
        <div className="border border-t w-full">
          <div className="flex w-full items-center px-5">
            <BsEmojiSmile/>
            <input className="commentInput" type="text" placeholder="Add comment..."/>
          </div>
        </div>
      </div>
      <ChakraProvider>
      <CommentModal 
      isLikedPost={isLikedPost} 
      isSavedPost={isSavedPost}
      handLikedPost={handLikedPost} 
      handSavedPost={handSavedPost}
      isOpen={isOpen} 
      onClose={onClose}/>
      </ChakraProvider>
    </div>
  );
};

export default PostCard;

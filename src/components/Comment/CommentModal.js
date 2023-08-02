import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import CommentCard from "./CommentCard";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import './CommentModal.css'
const CommentModal = ({
  onClose,
  isOpen,
  isLikedPost,
  isSavedPost,
  handLikedPost,
  handSavedPost,
}) => {
  return (
    <div>
      <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex h-[80vh]">
              <div className="w-[45%] flex flex-col justify-center">
                <img
                  className="max-h-full w-full"
                  src="https://cdn.pixabay.com/photo/2023/06/25/08/46/woman-8086721_1280.jpg"
                />
              </div>
              <div className="w-[55%]">
                <div className="flex justify-between items-center pl-10 py-5">
                  <div className="flex items-center">
                    <img
                      className="w-9 h-9 rounded-full"
                      src="https://cdn.pixabay.com/photo/2023/06/25/08/46/woman-8086721_1280.jpg"
                    />
                    <p className="ml-2">username</p>
                  </div>
                  <BsThreeDots />
                </div>
                <hr />
                <div className="comment pl-10">
                  {[1, 1, 1, 1, 1, 1, 1].map((item) => (
                    <CommentCard />
                  ))}
                </div>

                <div className="flex justify-between items-center py-2 pl-10">
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
                    <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />
                    <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
                  </div>
                  <div>
                    {isSavedPost ? (
                      <BsBookmarkFill
                        className="text-xl hover:opacity-50 cursor-pointer"
                        onClick={handSavedPost}
                      />
                    ) : (
                      <BsBookmark
                        className="text-xl hover:opacity-50 cursor-pointer"
                        onClick={handSavedPost}
                      />
                    )}
                  </div>
                </div>

                <div className="w-full pl-10">
                  <p>10 likes</p>
                  <p className="opacity-50 cursor-pointer">1 days ago</p>
                </div>

                <div className="pl-10">
                <div className="border border-t w-full">
                  <div className="flex w-full  items-center px-5">
                    <BsEmojiSmile />
                    <input
                      className="commentInput"
                      type="text"
                      placeholder="Add comment..."
                    />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;

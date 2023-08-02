import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const CommentCard = () => {
    const [isCommentLike, setIsCommentLike]=useState()
    const handleLikeComment = () => {
        setIsCommentLike(!isCommentLike);
      };
  return (
    <div className='flex items-center justify-between py-2'>
        <div className='flex items-center'>
            <div>
                <img className='w-9 h-9 rounded-full'
                src='https://cdn.pixabay.com/photo/2023/06/25/08/46/woman-8086721_1280.jpg'
                alt=''/>
            </div>
            <div className='ml-3'>
                <p>
                    <span className='font-semibold'>username</span>
                    <span className='ml-2'>nice post</span>
                </p>
                <div className='flex items-center space-x-3 text-xs opacity-60 pt-1'>
                    <span>1 min ago</span>
                    <span>10 likes</span>
                </div>
            </div>
        </div>
        {isCommentLike ? (
              <AiFillHeart
                className="text-sm hover:opacity-50 cursor-pointer text-red-600"
                onClick={handleLikeComment}
              />
            ) : (
              <AiOutlineHeart
                className="text-sm hover:opacity-50 cursor-pointer"
                onClick={handleLikeComment}
              />
            )}
    </div>
  )
}

export default CommentCard
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { isCommentLikedByUser, timeDifference } from '../../config/Logic';
import { useDispatch, useSelector } from 'react-redux';
import { likeCommentAction, unLikeCommentAction } from '../../Redux/Comment/Action';

const CommentCard = ({comment}) => {
    const [isCommentLike, setIsCommentLike]=useState(false)
    const token=localStorage.getItem('tokenChat')
    const {auth}=useSelector((store)=>store)
    const dispatch=useDispatch()
    const data={
      commentId: comment.id,
      jwt: token,
    }
    const handleLikeComment = () => {
        setIsCommentLike(true);
        dispatch(likeCommentAction(data))
      };
      const handleUnLikeComment = () => {
        setIsCommentLike(false);
        dispatch(unLikeCommentAction(data))
      };
      useEffect(()=>{
        setIsCommentLike(isCommentLikedByUser(comment, auth.reqUser?.userId))
      }, [auth.reqUser, comment])
  return (
    <div className='flex items-center justify-between py-2'>
        <div className='flex items-center'>
            <div>
                <img className='w-9 h-9 rounded-full'
                src={comment?.user?.userImage ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt=''/>
            </div>
            <div className='ml-3'>
                <p>
                    <span className='font-semibold'>{comment?.user?.username}</span>
                    <span className='ml-2'>{comment.comment}</span>
                </p>
                <div className='flex items-center space-x-3 text-xs opacity-60 pt-1'>
                    <span>{timeDifference(comment?.createAt)}</span>
                    {comment?.likeByUsers.length>0 && <span>{comment?.likeByUsers.length} likes</span>}
                </div>
            </div>
        </div>
        {isCommentLike ? (
              <AiFillHeart
                className="text-sm hover:opacity-50 cursor-pointer text-red-600"
                onClick={handleUnLikeComment}
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
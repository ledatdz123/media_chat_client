import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import './ReqUserPostCard.css'
const ReqUserPostCard = () => {
  return (
    <div>
        <div className='post w-52 h-52'>
            <img className='cursor-pointer' 
            src='https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg'/>
            <div className='overlay'>
                <div className='overlay-text flex justify-between'>
                    <div>
                        <AiFillHeart/> <span>10</span>
                    </div>
                    <div>
                        <FaComment/> <span>30</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReqUserPostCard
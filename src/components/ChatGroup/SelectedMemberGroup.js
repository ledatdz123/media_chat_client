import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const SelectedMemberGroup = ({handleRemoveMember, member}) => {
  return (
    <div className='flex items-center bg-slate-300 rounded-full p-2'>
        <img className='w-6 h-6 rounded-full'
         src='https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.jpg'>
        </img>
        <p className='px-2'>{member.username}</p>
        <AiOutlineClose onClick={handleRemoveMember}
         className='pr-0 cursor-pointer'/>
    </div>
  )
}

export default SelectedMemberGroup
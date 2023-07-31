import { Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { createGroupChat } from '../../Redux/Chat/Action'

const NewGroup = ({groupMember, setIsGroup}) => {
  const [isImageLoading, setIsImageLoading]=useState(false)
  const [groupImage, setGroupImage]=useState("https://cdn.pixabay.com/photo/2013/03/30/00/11/user-97890_1280.png")
  const [groupName, setGroupName]=useState("")
  const token=localStorage.getItem("tokenChat")
  const dispatch=useDispatch()
  const handleCreateGroup=()=>{
    const userIds=[]
    for(let user of groupMember){
      userIds.push(user.userId)
    }
    const group={
      userIds,
      chat_name:groupName,
      chat_image:groupImage
    }
    const data={
      group,
      token
    }
    dispatch(createGroupChat(data))
    setIsGroup(false)
  }
  return (
    <div className='w-full h-full'>
      <div className='flex items-center space-x-10 bg-[#008069] text-white pt-10 pb-5 px-3'>
        <BsArrowLeft className='cursor-pointer test-2xl font-bold'/>
        <p className='text-xl font-semibold'>New Group</p>
      </div>

      <div className='flex flex-col justify-center items-center my-6'>
        <label htmlFor='imgInput' className='relative'>
          <img className='rounded-full w-[15vw] h-[15vw] cursor-pointer object-fill' 
          src='https://cdn.pixabay.com/photo/2013/03/30/00/11/user-97890_1280.png'/>
          {isImageLoading && <CircularProgress className='absolute top-[5rem] h-[5rem]'/>}
        </label>
        <input 
        type='file'
        id='imgInput'
        className='hidden'
        onChange={()=>console.log("imageonchange")}
        />
      </div>
      <div className='w-full flex justify-between items-center py-2 px-5'>
        <input className='w-full outline-none border-b-2 border-green-600 px-2 bg-transparent'
        type='text'
        onChange={(e)=>setGroupName(e.target.value)}
        placeholder='Group Name'
        value={groupName}
        />
      </div>
      {groupName && <div className='flex justify-center items-center mt-16'>
        <Button onClick={handleCreateGroup}>
        <div className='p-4 rounded-full bg-green-600'>
          <BsCheck2/>
        </div>
        </Button>
      </div>}
    </div>
  )
}

export default NewGroup
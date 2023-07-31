import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import {stories} from './DummyStory'
import ProgressBar from '../../components/StatusUserCard/ProgressBar'
import { useNavigate } from 'react-router-dom'
const StatusViewer = () => {
  const [curentStoryIndex, setCurentStoryIndex]=useState(0)
  const [activeIndex, setActiveIndex]=useState(0)
  const navigate=useNavigate()
  const handleNextStory=()=>{
    if(curentStoryIndex<stories?.length-1){
      setCurentStoryIndex(curentStoryIndex+1)
      setActiveIndex(activeIndex+1)
    }
    else{
      setCurentStoryIndex(0)
      setActiveIndex(0)
    }
  }
  useEffect(()=>{
    const intervalId=setInterval(()=>{
      handleNextStory()
    }, 3000)
    return ()=>clearInterval(intervalId)
  }, [curentStoryIndex])
  const handleNavigate=()=>{
    navigate(-1)
  }
  const handleClose=()=>{
    setCurentStoryIndex(curentStoryIndex-1)
    setActiveIndex(activeIndex-1)
  }
  return (
    <div>
      <div className='flex relative justify-center items-center h-[100vh] bg-slate-900'>
        <div className='relative w-[60vh] h-[96vh] flex '>
          <img className='max-h-[96vh] object-contain'
          src={stories?.[curentStoryIndex].image}/>
          <div className='absolute top-0 flex w-full'>
            {stories.map((item, index)=><ProgressBar key={index} duration={3000} index={index} activeIndex={activeIndex} />)}
          </div>
        </div>
        <div>
          <BsArrowLeft onClick={handleClose} className='text-white text-xl absolute top-4 left-4 cursor-pointer'/>
          <AiOutlineClose onClick={handleNavigate} className='text-white text-xl absolute top-4 right-4 cursor-pointer'/>
        </div>
      </div>
    </div>
  )
}

export default StatusViewer
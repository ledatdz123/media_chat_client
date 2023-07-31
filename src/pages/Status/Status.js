import React from 'react'
import StatusUserCard from '../../components/StatusUserCard/StatusUserCard'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
const Status = () => {
  const navigate=useNavigate()
  const handleNavigate=()=>{
    navigate(-1)
  }
  return (
    <div>
      <div className='flex px-[8vw] py-[7vh]'>
        <div className='left h-[85vh] bg-[#1e262c] lg:w-[30%] w-[50%]'>
          <div className='pt-5 h-[14%] pb-2 '>
            <StatusUserCard/>
          </div>
          <div className='overflow-y-scroll h-[86%] pt-2'>
            {[1,1,1,1,1,1,1,1,1,1,].map((item)=><StatusUserCard/>)}
          </div>
        </div>
        <div className='relative h-[85vh] lg:w-[70%] w-[50%] bg-[#0b141a]'>
          <AiOutlineClose className='cursor-pointer absolute top-2 right-2 text-white text-xl'
           onClick={handleNavigate} />
        </div>
      </div>
    </div>
  )
}

export default Status
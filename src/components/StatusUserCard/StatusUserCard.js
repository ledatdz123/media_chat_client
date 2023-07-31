import React from 'react'
import { useNavigate } from 'react-router-dom'

const StatusUserCard = () => {
    const navigate=useNavigate()
    const handleNavigate=()=>{
        navigate(`status/{userId}`)
    }
  return (
    <div className='flex items-center p-3' onClick={handleNavigate}>
        <div>
            <img className='h-7 w-7 lg:w-10 lg:h-10 rounded-full'
            src='https://cdn.pixabay.com/photo/2016/11/29/02/28/woman-1866858_1280.jpg'
            alt=''/>
        </div>
        <div className='ml-2 text-white'>
            <p>dimitri</p>
        </div>
    </div>
  )
}

export default StatusUserCard
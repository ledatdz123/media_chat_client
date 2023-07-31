import React from 'react'

const ChatCard = ({userImage, name}) => {
  return (
    <div className='flex items-center justify-center px-3 py-2 cursor-pointer group hover:bg-slate-500'>
        <div className='w-[20%]'>
            <img className='rounded-full h-10 w-10 cursor-pointer object-cover'
            src={userImage}
            />
        </div>
        <div className='w-[80%]'>
            <div className='flex justify-between items-center'>
                <p className='text-lg'>{name}</p>
                <p className='text-sm'>timestamp</p>
            </div>
            <div className='flex justify-between items-center'>
                <p>message...</p>
                <div className='flex space-x-2 items-center'>
                    <p className='text-xs py-1 px-2 text-white bg-green-500 rounded-full'>5</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatCard
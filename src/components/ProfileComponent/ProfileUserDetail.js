import { Button, ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { TbCircleDashed } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const ProfileUserDetail = () => {
    const {auth}=useSelector((store)=>store)
    const navigate=useNavigate()
    console.log('auth--------------------', auth)
  return (
    <div className='py-10 w-full'>
        <div className='flex items-center'>
            <div className='w-[15%]'>
                <img className='w-32 h-32 rounded-full'
                src='https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg'
                alt=''
                />
            </div>
            <div className='space-y-5'>
                <div className='flex space-x-10 items-center'>
                    <p>{auth.reqUser?.username}</p>
                    <ChakraProvider>
                        <Button onClick={()=>navigate('/account/edit')}>Edit Profile</Button>
                    </ChakraProvider>
                    <TbCircleDashed/>
                </div>
                <div className='flex space-x-10'>
                    <div>
                        <span className='font-semibold mr-2'>10</span>
                        <span>posts</span>
                    </div>
                    <div>
                        <span className='font-semibold mr-2'>10</span>
                        <span>follower</span>
                    </div>
                    <div>
                        <span className='font-semibold mr-2'>10</span>
                        <span>following</span>
                    </div>
                </div>
                <div>
                    <p>fullname</p>
                    <p>Engineering | Coder | Traveller</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileUserDetail
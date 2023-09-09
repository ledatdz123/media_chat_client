import React, { useEffect, useState } from 'react'
import StoryCircle from '../../components/Story/StoryCircle'
import HomeRight from '../../components/Home/HomeRight'
import PostCard from '../../components/Post/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { findUserPostAction } from '../../Redux/Post/Action'
import { currentUserAction, getPopularUserAction } from '../../Redux/Auth/Action'
import { postDefault } from '../../components/Post/DefaultPost'
import { Button, ChakraProvider } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
  const [userIds, setUserIds]=useState()
  const token=localStorage.getItem("tokenChat")
  const dispatch=useDispatch()
  const {auth, post}=useSelector((store)=>store)
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(currentUserAction(token));
  }, [token]);
  useEffect(()=>{
    const newIds=auth.reqUser?.following?.map((user)=>user.userId) || []
    setUserIds([auth.reqUser?.userId, ...newIds])
  }, [auth.reqUser])
  useEffect(()=>{
    const data={
      jwt:token,
      userIds: [userIds].join(",")
    }
    dispatch(findUserPostAction(data))
    dispatch(getPopularUserAction(data))
  }, [userIds, auth.followUser, auth.unfollowUser, post.createPost, post.deletePost])
  return (
    <div>
      <div className='mt-10 flex w-[100%] justify-center'>
        <div className='w-[50%] px-10'>
          <div className='storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full'>
            {[1,1,1,1].map((item)=>
            <StoryCircle/>
            )}
          </div>
          <div>
            {post.usersPost.length>0 ? post.usersPost.map((item)=>
            <PostCard post={item}/>)
            : 
            !auth.reqUser && <div>
              <PostCard post={postDefault}/>
              <div className='mt-8 flex flex-col items-center justify-between gap-1'>
                <p>You are not logged in.</p>
                <p>Let's login to experience.</p>
                <ChakraProvider>
                  <Button onClick={()=>navigate('/login')} className='mt-1'>Login now</Button>
                </ChakraProvider>
              </div>
            </div>
            }
          </div>
        </div>
        <div className='w-[30%]'>
          <HomeRight auth={auth}/>
        </div>
      </div>
    </div>
  )
}

export default HomePage
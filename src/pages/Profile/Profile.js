import React, { useEffect } from 'react'
import ProfileUserDetail from '../../components/ProfileComponent/ProfileUserDetail'
import ReqUserPostPart from '../../components/ProfileComponent/ReqUserPostPart'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { isFollowing, isReqUser } from '../../config/Logic'
import { currentUserAction, findUserByUserName } from '../../Redux/Auth/Action'

const Profile = () => {
  const dispatch=useDispatch()
  const token=localStorage.getItem("tokenChat")
  const {username}=useParams()
  const {auth}=useSelector(store=>store)
  
  const isRequser=isReqUser(auth.reqUser?.userId, auth.findByUsername?.userId)
  const isFollowed=isFollowing(auth.reqUser, auth.findByUsername)
  useEffect(()=>{
    const data={
      jwt: token,
      data: username
    }
    dispatch(currentUserAction(token))
    dispatch(findUserByUserName(data))
  }, [username, auth.followUser, auth.unfollowUser])
  return (
    <div className='px-20'>
      <div>
        <ProfileUserDetail user={isReqUser?auth.reqUser:auth.findByUsername} 
        isFollowing={isFollowed} 
        isRequser={isRequser}/>
      </div>
      <div>
        <ReqUserPostPart user={isReqUser?auth.reqUser:auth.findByUsername}/>
      </div>
    </div>
  )
}

export default Profile
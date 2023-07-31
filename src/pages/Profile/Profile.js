import React from 'react'
import ProfileUserDetail from '../../components/ProfileComponent/ProfileUserDetail'
import ReqUserPostPart from '../../components/ProfileComponent/ReqUserPostPart'

const Profile = () => {
  return (
    <div className='px-20'>
      <div>
        <ProfileUserDetail/>
      </div>
      <div>
        <ReqUserPostPart/>
      </div>
    </div>
  )
}

export default Profile
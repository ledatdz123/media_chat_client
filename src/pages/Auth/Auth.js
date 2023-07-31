import React from 'react'
import Signin from '../../components/Rester/Signin'

const Auth = () => {
  return (
    <div>
        <div className='flex items-center justify-center h-[100vh] space-x-5'>
            <div>
                <div className='h-[28rem] w-[20rem]'>
                    <img className='h-full w-full bg-cover'
                     src='https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM=w480-h960-rw'></img>
                </div>
            </div>
            <div className='border w-[25vw]'>
              <Signin/>
            </div>
        </div>
    </div>
  )
}

export default Auth
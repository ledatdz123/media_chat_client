import React from 'react'

const SearchCard = () => {
  return (
    <div>
        <div className='flex items-center'>
            <img className='w-10 h-10 rounded-full'
            src='https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg'
            alt=''/>
            <div>
                <p>Fullname</p>
                <p className='opacity-70'>username</p>
            </div>
        </div>
    </div>
  )
}

export default SearchCard
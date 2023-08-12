import React from 'react'
import './SearchComponent.css'
import SearchCard from './SearchCard'
const SearchComponent = () => {
  return (
    <div className='search-contain'>
        <div className='px-2 pb-3'>
            <h1 className='text-xl'>Search</h1>
            <input className='searchInput' type='text' placeholder='Search...'/>
        </div>
        <hr/>
        <div className='h-[70vh] overflow-y-scroll'>
          {[1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item)=><SearchCard/>)}
        </div>
    </div>
  )
}

export default SearchComponent
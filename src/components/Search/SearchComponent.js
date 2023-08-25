import React, { useState } from 'react'
import './SearchComponent.css'
import SearchCard from './SearchCard'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../Redux/Auth/Action'
const SearchComponent = () => {
  const dispatch=useDispatch()
  const token=localStorage.getItem("tokenChat")
  const {auth}=useSelector(store=>store)
  const [query, setQuery]=useState("")
  const handleSearch=(e)=>{
    dispatch(searchUser(token, e.target.value))
  }
  return (
    <div className='search-contain'>
        <div className='px-2 pb-3'>
            <h1 className='text-xl'>Search</h1>
            <input onChange={handleSearch} className='searchInput' type='text' placeholder='Search...'/>
        </div>
        <hr/>
        <div className='h-[70vh] overflow-y-scroll px-2 pt-2'>
          {auth.searchUser?.map((item)=><SearchCard/>)}
        </div>
    </div>
  )
}

export default SearchComponent
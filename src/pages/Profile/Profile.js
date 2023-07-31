import React, { useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { postAction, reqAction } from '../../Redux/Test/Action'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { BsEmojiSmile } from 'react-icons/bs'

const Profile = () => {
  const [post, setPost]=useState({
    title: '',
    post: ''
  })
  const [user, setUser]=useState(null)
  const [showEmoji, setShowEmoji]=useState(false)
  const [content, setContent]=useState("")
  const handleInput=(event)=>{
    setPost({...post, [event.target.name]: event.target.value})
  }
  const arrayPost=JSON.parse(localStorage.getItem("post"))
  useEffect(() => { 
    dispatch(reqAction(arrayPost))
  }, []); 
  const isuser=useSelector(store=>store)
  const dispatch=useDispatch()
  const postGet=useSelector(store=>store.post)
  console.log(postGet)
    if(user){
      return <Navigate to={"/login"}></Navigate>
      }
  const click=(e)=>{
    setUser(null)
    e.preventDefault()
    dispatch(postAction(post))
  }
  const addEmoji=(e)=>{
    const sym =e.unified.split("_")
    const codeArray=[]
    sym.forEach((el)=>codeArray.push("0x"+el))
    let emoji= String.fromCodePoint(...codeArray)
    setContent(content+emoji)
  }
  console.log("cont-------------ent-----------", content)
  return (
    <div>
    <div className='flex items-center justify-center'>
      Profile
      <form className='form' onSubmit={click}>
        Title: <input type='text' onChange={handleInput} name='title'></input><br></br>
        Post: <input type='text' onChange={handleInput} name='post'></input><br></br>
        <button>Submit</button>
      </form>
      <a href='/test'>NEXT</a>
      
    </div>
    <div>
      <p>emoji</p>
      <form className='flex justify-center items-center relative'>
        <label>aaa</label>
        <input
        onChange={(e)=>setContent(e.target.value)}
        value={content}
         placeholder='text in area'></input>
        <span onClick={()=>{setShowEmoji(!showEmoji)}}><BsEmojiSmile className='cursor-pointer'></BsEmojiSmile></span>
        {showEmoji &&<div className='absolute right-5 top-5'>
          <Picker
          data={data} emojiSize={18} 
          emojiButtonSize={22}
          onEmojiSelect={addEmoji}
          maxFrequentRows={0}
          ></Picker>
        </div>}
      </form>
      
    </div>
    </div>
  )
}

export default Profile
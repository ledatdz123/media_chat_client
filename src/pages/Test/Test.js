import { Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAction, reqAction } from '../../Redux/Test/Action'

const Test = () => {
  const arrayPost=JSON.parse(localStorage.getItem("post"))
  const dispatch=useDispatch()
  console.log('arr', arrayPost)
  // useEffect(() => { 
  //   dispatch(reqAction(arrayPost))
  // }, []); 
  const postGet=useSelector(store=>store.post)
  console.log(postGet)
  const onClick=()=>{
  }
  return (
    <div>Test
        <button onClick={onClick}>Submit</button>
    </div>
  )
}

export default Test
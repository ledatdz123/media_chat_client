import React, { useEffect, useState } from "react";
import {} from "react-icons/bi";
import {
  BsEmojiAngry,
  BsEmojiHeartEyes,
  BsEmojiSmile,
  BsFillEmojiKissFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { BASE_API } from "../../config/api";
const MessageCard = ({ isReqUserMessage, content, image, messageId, currentChat }) => {
  const [check ,setCheck] = useState();
  const [smile, setSmile] = useState([]);
  const [angry, setAngry]=useState([]);

  const [heart, setHeart]=useState([]);
  const [sad, setSad]=useState([]);

  const [hover, setHover] = useState(false);
  const [openReact, setOpenReact]=useState(false)
  const token=localStorage.getItem("tokenChat")
  useEffect(()=>{
    if (currentChat?.id)
    getAllMessageEmoji()
  }, [currentChat, check])

  const getAllMessageEmoji = async () => {
    try {
      const res=await fetch(`${BASE_API}/api/react/message/${messageId}/reacts`,{
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      })
      const data=await res.json();
      setSmile(data.filter(e=>e.content==='funny'))
      setAngry(data.filter(e=>e.content==='angry'))
      setHeart(data.filter(e=>e.content==='heart'))
      setSad(data.filter(e=>e.content==='sad'))
  } catch (error) {
      console.log("loi trycatch chat", error)
  }
  };
  const handleHover = (e) => {
    setHover(true);
  };
  const handleLeave = (e) => {
    setHover(false);
  };
  const handleOpenReactOption=(e)=>{
    setOpenReact(!openReact)
  }
  const createData=async(type)=>{
    try {
      const res=await fetch(`${BASE_API}/api/react/message/${messageId}/reacts`,{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(type)
      })
      const data=await res.json();
      setCheck(data)
  } catch (error) {
      console.log("loi trycatch message", error)
  }
  }
  const chooseSmile=async()=>{
    const smile={content: "funny"}
  //   try {
  //     const res=await fetch(`${BASE_API}/api/react/message/${messageId}/reacts`,{
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(smile)
  //     })
  //     const data=await res.json();
  //     setCheck(data)
  // } catch (error) {
  //     console.log("loi trycatch message", error)
  // }
  createData(smile)
    setOpenReact(!openReact)
  }
  const chooseAngry=()=>{
    setAngry(angry+1)
    setOpenReact(!openReact)
  }
  const chooseHeart=()=>{
    setHeart(heart+1)
    setOpenReact(!openReact)
  }
  const chooseSad=()=>{
    setSad(sad+1)
    setOpenReact(!openReact)
  }
  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className={`rounded-2xl relative max-w-[50%]
    ${isReqUserMessage ? "self-start bg-white" : "self-end bg-[#d9fdd3]"}

    ${image ? "" : "px-3 py-[6px]"}
        `}
    >
      {!image ? (
        <p className="break-words text-left">{content}</p>
      ) : (
        <img className="w-[12.5vw] h-[15vw]" src={content}></img>
      )}
      {hover && (
        <div className="flex absolute top-[25%] right-[-30px]">
          <BsEmojiSmile className="cursor-pointer"
          onClick={handleOpenReactOption}></BsEmojiSmile>
          <BsThreeDotsVertical className="cursor-pointer"></BsThreeDotsVertical>
        </div>
      )}
      <div className="text-[12px] flex absolute">
        {smile.length > 0 && <BsEmojiSmile></BsEmojiSmile>}
        {angry.length>0 && <BsEmojiAngry></BsEmojiAngry>}
        {heart.length>0 && <BsEmojiHeartEyes></BsEmojiHeartEyes>}
        {sad.length>0 && <BsFillEmojiKissFill></BsFillEmojiKissFill>}
      </div>
      {openReact && <div className="flex absolute left-[50%]">
        <BsEmojiSmile onClick={chooseSmile} className="cursor-pointer"></BsEmojiSmile>
        <BsEmojiAngry onClick={chooseAngry} className="cursor-pointer"></BsEmojiAngry>
        <BsEmojiHeartEyes onClick={chooseHeart} className="cursor-pointer"></BsEmojiHeartEyes>
        <BsFillEmojiKissFill onClick={chooseSad} className="cursor-pointer"></BsFillEmojiKissFill>
      </div>}
    </div>
  );
};

export default MessageCard;

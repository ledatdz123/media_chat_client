import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
const ChatProfile = ({handleNavigateProfile}) => {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState("");
  const handleNavigate=handleNavigateProfile
  const handleFlag = () => {
    setFlag(!flag);
  };
  const onChangeUsername=(e)=>{
    setUsername(e.target.value)
  }
  return (
    <div>
      <div className="flex items-center space-x-10 pt-10 pb-5 px-14">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={handleNavigate}
        />
        <p className="cursor-pointer font-semibold">Profile Chat</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="imInput">
          <img
            className="rounded-full w-[15vw] h-[15vw] cursor-pointer object-cover"
            src="https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg"
            alt=""
          />
          <input type="file" id="imgInput" className="hidden" onChange={()=>console.log("imageonchange")}/>
        </label>
      </div>

      <div>
        <p className="py-3 flex self-start ml-3">Your name</p>
        {!flag && (
          <div className="flex justify-between items-center px-3">
            <p className="">{username || "username"}</p>
            <BsPencil onClick={handleFlag} className="cursor-pointer" />
          </div>
        )}
        {flag && (
          <div className="flex justify-center items-center gap-4">
            <input
              className="w-[80%] p-1 rounded-md outline-none border-b-2 border-blue-200"
              type="text"
              placeholder="Enter your name"
              onChange={onChangeUsername}
              value={username}
            />
            <BsCheck2
              onClick={handleFlag}
              className="cursor-pointer text-2xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatProfile;

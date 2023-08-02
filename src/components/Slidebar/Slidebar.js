import React, { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { menu } from "./SlidebarConfig";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "../Post/CreatePostModal";
import { useDisclosure } from "@chakra-ui/react";

const Slidebar = () => {
  const [activeTab, setActiveTab]=useState();
  const {isOpen, onOpen, onClose}=useDisclosure()
  const navigate=useNavigate()
  const handleTabClick=(title)=>{
    setActiveTab(title)
    if(title==='Profile'){
      navigate('/username')
    }
    else if(title==='Message'){
      navigate('/chatpage')
    }
    else if(title==='Home'){
      navigate('/')
    }
    else if(title==='Create'){
      onOpen()
    }
  }
  return (
    <div className="sticky top-0 h-[100vh] py-2">
      <div className="flex flex-col justify-between h-full px-10">
        <div>
          <div>
            <img className="w-40" src="https://i.imgur.com/zqpwkLQ.png"></img>
          </div>
          <div className="mt-10">
            {menu.map((item) => (
              <div onClick={()=>handleTabClick(item.title)} className="flex items-center mb-5 cursor-pointer text-lg">
                {activeTab===item.title ? item.activeIcon : item.icon}
                <p className={`${activeTab===item.title ? "font-bold" : "font-semibold"}`}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center cursor-pointer">
          <IoReorderThreeOutline />
          <p className="ml-5">More</p>
        </div>
      </div>
      <CreatePostModal onClose={onClose} isOpen={isOpen}/>
    </div>
  );
};

export default Slidebar;

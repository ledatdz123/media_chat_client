import React, { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { menu } from "./SlidebarConfig";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "../Post/CreatePostModal";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import SearchComponent from "../Search/SearchComponent";

const Slidebar = () => {
  const [activeTab, setActiveTab]=useState("");
  const {isOpen, onOpen, onClose}=useDisclosure()
  const [isSearchVisible, setIsSearchVisible]=useState(false)

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
    if(title==='Search'){
      setIsSearchVisible(true)
    }else{
      setIsSearchVisible(false)
    }
  }
  return (
    <div className="sticky top-0 h-[100vh] py-2 flex">
      <div className={`flex flex-col justify-between h-full ${activeTab==='Search' ? "" : "px-10"}`}>
      <div>
          {activeTab !== 'Search' && <div>
            <img className="w-40" src="https://i.imgur.com/zqpwkLQ.png"></img>
          </div>}
          <div className="mt-10">
            {menu.map((item) => (
              <div onClick={()=>handleTabClick(item.title)} className={`mb-5 cursor-pointer text-lg ${activeTab==='Search' ? "" : "flex"}`}>
                {activeTab===item.title ? item.activeIcon : item.icon}
                {activeTab !=='Search' && <p className={`${activeTab===item.title ? "font-bold" : "font-semibold"}`}>{item.title}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center cursor-pointer pb-10">
          <IoReorderThreeOutline />
          {activeTab !=='Search' && <p className="ml-5">More</p>}
        </div>
      </div>
      <ChakraProvider>
      <CreatePostModal onClose={onClose} isOpen={isOpen}/>
      </ChakraProvider>
      {isSearchVisible && <SearchComponent/>}
    </div>
  );
};

export default Slidebar;

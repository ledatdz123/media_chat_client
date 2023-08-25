import React, { useEffect, useState } from "react";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import ReqUserPostCard from "./ReqUserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction } from "../../Redux/Post/Action";
const ReqUserPostPart = ({user}) => {
  const [activeTab, setActiveTab] = useState("Post");
  const token=localStorage.getItem("tokenChat")
  const {post}=useSelector(store=>store)
  const dispatch=useDispatch()
  const tabs = [
    {
      tab: "Post",
      icon: <AiOutlineTable />,
      activeTab: "",
    },
    {
      tab: "Reels",
      icon: <RiVideoAddLine />,
      activeTab: "",
    },
    {
      tab: "Saved",
      icon: <BiBookmark />,
    },
    {
      tab: "Tagged",
      icon: <AiOutlineUser />,
    },
  ];
  useEffect(()=>{
    const data={
      token: token,
      userId: user?.userId
    }
    dispatch(reqUserPostAction(data))
  }, [user, post.createPost])
  console.log('---------user------------', user)
  return (
    <div>
      <div className="flex space-x-14 border-t relative">
        {tabs.map((item) => (
          <div
            onClick={() => setActiveTab(item.tab)}
            className={`${
              activeTab === item.tab ? "border-t border-black" : "opacity-60"
            } flex items-center cursor-pointer py-2 text-sm`}
          >
            <p>{item.icon}</p>
            <p className="ml-1">{item.tab}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-wrap">
          {activeTab ==='Post' && post.reqUserPost?.map((item)=><ReqUserPostCard postCard={item}/>)}
          {activeTab ==='Saved' && user.savedPosts?.map((item)=><ReqUserPostCard postCard={item}/>)}
        </div>
      </div>
    </div>
  );
};

export default ReqUserPostPart;

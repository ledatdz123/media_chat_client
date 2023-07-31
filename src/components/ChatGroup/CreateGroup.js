import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SelectedMemberGroup from "./SelectedMemberGroup";
import ChatCard from "../ChatCard/ChatCard";
import NewGroup from "./NewGroup";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/Action";

const CreateGroup = ({ handleCreateGroup, setIsGroup }) => {
  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Set());
  const [query, setQuery]=useState("")
  const dispatch=useDispatch()
  const token=localStorage.getItem("tokenChat")
  const {auth}=useSelector((store)=>store)
  const handleRemoveMember = (item) => {
    groupMember.delete(item);
    setGroupMember(groupMember);
  };
  const handleSearch=(query)=>{
    dispatch(searchUser(token, query))
  }
  console.log("group---------member-----------", groupMember)
  return (
    <div>
      <div className="w-full h-full">
        {!newGroup && (
          <div>
            <div className="flex items-center space-x-10 bg-[#008069] text-white pt-10 pb-5 px-3">
              <BsArrowLeft
                onClick={handleCreateGroup}
                className="text-2xl font-semibold"
              />
              <p className="text-xl font-semibold">Add Group Participant</p>
            </div>
            <div className="relative bg-white py-4 px-3">
              <div className="flex space-x-2 flex-wrap space-y-1">
                {groupMember.size > 0 &&
                  Array.from(groupMember).map((item) => (
                    <SelectedMemberGroup
                      handleRemoveMember={() => handleRemoveMember(item)}
                      member={item}
                    />
                  ))}
              </div>
              <input type="text" 
              onChange={(e)=>{
                handleSearch(e.target.value)
                setQuery(e.target.value)
              }}
              className="outline-none border-b border-[#8888] p-2 w-[93%]"
              placeholder="Search user"
              value={query}
              />
            </div>

            <div className="bg-white overflow-y-scroll h-[50.2vh]">
                {query && auth.searchUser?.map((item)=><div onClick={()=>{
                    groupMember.add(item)
                    setGroupMember(groupMember)
                    setQuery("")
                }}
                key={item?.id}
                >
                    <hr/>
                    <ChatCard name={item.username}/>
                </div>)
                }
            </div>

            <div className="bottom-10 py-10 bg-slate-200 flex items-center justify-center">
                <div className="bg-green-600 rounded-full p-4 cursor-pointer"
                onClick={()=>{
                    setNewGroup(!newGroup)
                }}
                >
                    <BsArrowRight className="text-white"></BsArrowRight>
                </div>
            </div>
          </div>
        )}
        {newGroup && <NewGroup groupMember={groupMember} setIsGroup={setIsGroup}/>}
      </div>
    </div>
  );
};

export default CreateGroup;

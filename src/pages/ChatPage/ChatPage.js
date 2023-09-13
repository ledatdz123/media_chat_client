import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsFilter,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";
import ChatCard from "../../components/ChatCard/ChatCard";
import MessageCard from "../../components/MessageCard/MessageCard";
import "./ChatPage.css";
import ChatProfile from "../../components/ChatProfile/ChatProfile";
import { useNavigate } from "react-router-dom";
import { Alert, Menu, MenuItem, Snackbar } from "@mui/material";
import CreateGroup from "../../components/ChatGroup/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUserAction,
  handleLogoutUser,
  searchUser,
} from "../../Redux/Auth/Action";
import { createChat, getAllChat } from "../../Redux/Chat/Action";
import { getAllMessage } from "../../Redux/Message/Action";
import ChatInput from "../../components/ChatInput/ChatInput";
import SockJS from "sockjs-client";
import {over} from 'stompjs'
import Stomp from 'stompjs';

import { BASE_API } from "../../config/api";
const ChatPage = () => {
  const [queryChat, setQueryChat] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("tokenChat");

  //socket
  const [stompClient, setStompClient]=useState()
  const [isConnect, setIsConnect]=useState(false)
  const [messages, setMessages]=useState([])
  const connect=()=>{
    const sock=new SockJS(`${BASE_API}/ws`)
    const temp=over(sock)
    setStompClient(temp)
    const headers={
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      //"X-XSRF-TOKEN": getCookie("XSRF-TOKEN")
    }
    temp.connect(headers, onConnect, onError)
  }
  // function getCookie(name){
  //   const value=`; ${document.cookie}`;
  //   const parts=value.split(`; ${name}=`)
  //   if(parts.length===2){
  //     return parts.pop().split(";").shift()
  //   }
  // }
  const onError=(error)=>{
    console.log('error', error)
  }
  const onConnect=()=>{
    setIsConnect(true)
    console.log('no error')
  }
  const onReceive=(payload)=>{
    console.log("---------------recieve---------------", JSON.parse(payload.body))
    const recieve=JSON.parse(payload.body)
    setMessages([...messages, recieve])
  }
  useEffect(()=>{
    connect()
  }, [])  
  const userJoin=()=>{
    var chatMessage = {
      chatId: currentChat.id, 
      content: 'Hello',
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
}
  useEffect(()=>{
    if(isConnect && stompClient && auth.reqUser && currentChat){
      //const subscription=stompClient.subscribe("/group/"+currentChat.id.toString(), onReceive)
      const subscription=stompClient.subscribe('/chatroom/public', onReceive);
      console.log("hello--------------------------")
      userJoin()
      return ()=>{
        subscription.unsubscribe()
      }
    }
  })
  useEffect(()=>{
    if(message.newMessage && stompClient){
      setMessages([...messages, message.newMessage])
      stompClient?.send("/app/message", {}, JSON.stringify(message.newMessage))
    }
  }, [message.newMessage])
  useEffect(()=>{
    setMessages(message.messages)
  }, [message.messages])
  console.log("--------------messages----------------", messages)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onChangeContentChat = (e) => {
    setContent(e.target.value);
  };
  const handleClickOnChat = (userId) => {
    setCurrentChat(true);
    dispatch(createChat({ token, data: userId }));
    setQueryChat("");
  };
  const handleCurrentChat = (item) => {
    setCurrentChat(item);
  };
  const handleNavigateProfile = () => {
    setIsProfile(!isProfile);
  };
  const handleCreateGroup = () => {
    setIsGroup(!isGroup);
    setAnchorEl(null);
  };
  if (token === null) {
    navigate("/");
  }
  useEffect(() => {
    dispatch(currentUserAction(token));
  }, [token]);
  useEffect(() => {
    dispatch(getAllChat(token));
  }, [chat.createChat, chat.createGroup]);
  useEffect(() => {
    if (currentChat?.id)
      dispatch(getAllMessage({ token, chatId: currentChat.id }));
  }, [currentChat, message.newMessage]);

  const handleSnackBarClose = () => {
    setOpenSnackbar(false);
  };
  const handleLogout = () => {
    dispatch(handleLogoutUser());
    navigate("/")
  };
  const handleSearch = (keyword) => {
    dispatch(searchUser(token, keyword));
  };
  return (
    <div>
      <div className="flex bg-[#f0f2f5] h-[100vh]">
        <div className="left w-[30%] bg-[#e8e9ec]">
          {isGroup && (
            <CreateGroup
              handleCreateGroup={handleCreateGroup}
              setIsGroup={setIsGroup}
            />
          )}
          {isProfile && (
            <ChatProfile handleNavigateProfile={handleNavigateProfile} />
          )}
          {!isGroup && !isProfile && (
            <div className="w-full">
              <div className="flex items-center space-x-3 justify-between p-3">
                <div
                  className="flex items-center space-x-3"
                  onClick={handleNavigateProfile}
                >
                  <img
                    className="rounded-full h-10 w-10 cursor-pointer object-cover"
                    src="https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_1280.jpg"
                    alt=""
                  />
                  <p>{auth.reqUser?.username}</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => navigate("/status")}
                  />
                  <BiCommentDetail className="cursor-pointer" />
                  <div>
                    <BsThreeDotsVertical
                      className="cursor-pointer"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />
                    <Menu
                      className=""
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleCreateGroup}>
                        Create Group
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center bg-white py-4 px-3">
                <input
                  className="border-none outline-none bg-slate-200 rounded-md w-[95%] pl-9 py-1"
                  type="text"
                  placeholder="Search or start new chat"
                  onChange={(e) => {
                    setQueryChat(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={queryChat}
                />
                <AiOutlineSearch className="relative left-[-25px]" />
                <div>
                  <BsFilter className="text-2xl" />
                </div>
              </div>
              {/* all user */}
              <div className="bg-white overflow-y-scroll h-[77.5vh]">
                {queryChat &&
                  auth.searchUser?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleClickOnChat(item.userId)}
                    >
                      {" "}
                      <hr />{" "}
                      <ChatCard
                        userImage={
                          "https://cdn.pixabay.com/photo/2018/03/12/12/32/woman-3219507_1280.jpg"
                        }
                        name={item.username}
                      />
                    </div>
                  ))}

                {chat.chats.length > 0 &&
                  !queryChat &&
                  chat.chats?.map((item, index) => (
                    <div key={index} onClick={() => handleCurrentChat(item)}>
                      {" "}
                      <hr />
                      {item.group ? (
                        <ChatCard
                          name={item.chat_name}
                          userImg={
                            item.chat_name ||
                            "https://cdn.pixabay.com/photo/2013/03/30/00/11/user-97890_1280.png"
                          }
                        />
                      ) : (
                        <ChatCard
                          isChat={true}
                          name={
                            auth.reqUser?.userId !== item.users[0].userId
                              ? item.users[0].username
                              : item.users[1].username
                          }
                          userImage={
                            auth.reqUser?.userId !== item.users[0].userId
                              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                              : ""
                          }
                          // notification={notifications.length}
                          // isNotification={
                          //   notifications[0].chat?.userId===item.userId
                          // }
                          // message={
                          //   (item.userId===messages[messages.length-1]?.chat?.id && messages[messages.length-1]?.content) ||
                          //   (item.userId===notifications[0]?.chat?.id && notification[0]?.content)
                          // }
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        {!currentChat && (
          <div className="w-[70%] flex  items-center justify-center">
            <div className="max-w-[100%] border text-center">
              <img
                className="w-[300px] h-[300px] object-contain"
                src="https://cdn.pixabay.com/photo/2023/06/09/19/37/letter-8052497_1280.png"
              ></img>
            </div>
          </div>
        )}

        {currentChat && (
          <>
            <div className="w-[70%]">
              <div className="flex justify-between items-center p-3 bg-[#f0f2f5]">
                <div className="flex justify-between items-center space-x-3 ">
                  <img
                    className="rounded-full h-10 w-10 cursor-pointer object-cover"
                    src="https://cdn.pixabay.com/photo/2018/01/13/19/39/fashion-3080644_1280.jpg"
                    alt=""
                  />
                  <p>
                    {currentChat?.group
                      ? currentChat?.chat_name
                      : auth.reqUser?.userId === currentChat.users[0].userId
                      ? currentChat.users[1].username
                      : currentChat.users[0].username}
                  </p>
                </div>
                <div className="flex justify-center items-center py-3 space-x-3 absolute right-6">
                  <AiOutlineSearch />
                  <BsThreeDots />
                  
                </div>
              </div>

              {/* message section */}
              <div className="px-6 h-[75vh] overflow-y-scroll bg-blue-200">
                <div className="space-y-2 flex flex-col justify-center mt-5">
                  {messages.length > 0 &&
                    messages?.map((item, i) => (
                      <MessageCard
                        isReqUserMessage={
                          item.userApp.userId !== auth.reqUser?.userId
                        }
                        content={item.content}
                        image={item.image}
                        messageId={item.id}
                        currentChat={currentChat}
                      />
                    ))}
                </div>
                
              </div>

              <ChatInput 
              content={content} 
              setContent={setContent} 
              onChangeContentChat={onChangeContentChat}
              currentChat={currentChat}
              />

            </div>
          </>
        )}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          You have not sign in
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChatPage;

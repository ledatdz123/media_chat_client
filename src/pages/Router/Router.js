import React from "react";
import Slidebar from "../../components/Slidebar/Slidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Story from "../Story/Story";
import Test from "../Test/Test";
import Signin from "../../components/Rester/Signin";
import Signup from "../../components/Rester/Signup";
import ChatPage from "../ChatPage/ChatPage";
import Status from "../Status/Status";
import StatusViewer from "../Status/StatusViewer";
import ChatInfo from "../ChatInfo/ChatInfo";
import Profile from "../Profile/Profile";
const Router = () => {
  const location= useLocation()
  return (
    <div>

      {(location.pathname !=="/login" && location.pathname!=="/signup") &&
      <div className="flex">
        <div className="w-[20%] border border-1-slate-500">
          <Slidebar />
        </div>
        <div className="w-full">
          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/username" element={<Profile/>}></Route>
            <Route path="/chatinfo" element={<ChatInfo/>}></Route>
            <Route path="/story" element={<Story/>}></Route>
            <Route path="/test" element={<Test/>}></Route>
            <Route path="/chatpage" element={<ChatPage/>}></Route>
            <Route path="/status" element={<Status/>}></Route>
            <Route path="/post/:postId" element={<HomePage/>}></Route>
            <Route path="/status/status/:userId" element={<StatusViewer/>}></Route>
          </Routes>
        </div>
      </div>
}
{(location.pathname==="/login" || location.pathname==="/signup") &&
      <div>
        <Routes>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Signin></Signin>}></Route>
        </Routes>
      </div>
}
    </div>
  );
};
export default Router;

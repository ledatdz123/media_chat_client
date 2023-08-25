import React from "react";
import { useNavigate } from "react-router-dom";

const SuggestionCard = ({popularUser}) => {
  const navigate=useNavigate()
  return (
    <div className="flex justify-between items-center">
      <div onClick={()=>navigate(`/${popularUser?.username}`)} className="flex items-center cursor-pointer">
        <img
          className="h-9 w-9 rounded-full"
          src="https://cdn.pixabay.com/photo/2023/06/25/08/46/woman-8086721_1280.jpg"
          alt=""
        />
        <div className="ml-2">
          <p className="text-sm font-semibold">{popularUser?.username}</p>
          <p className="text-sm font-semibold opacity-70">Follow you</p>
        </div>
      </div>
      <p className="text-sm font-semibold opacity-70 text-blue-700">Follow</p>
    </div>
  );
};

export default SuggestionCard;

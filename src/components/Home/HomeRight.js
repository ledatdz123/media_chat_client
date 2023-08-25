import React from "react";
import SuggestionCard from "./SuggestionCard";

const HomeRight = ({auth}) => {
  return (
    <div className="border">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            />
            <div className="ml-3">
              <p>Fullname</p>
              <p className="opacity-70">username</p>
            </div>
          </div>
          <p className="text-sm font-semibold opacity-70 text-blue-700">switch</p>
        </div>
        <div className="space-y-5 mt-6">
          {auth.popularUser?.map((item) => (
            <SuggestionCard popularUser={item}/>
          ))}
        </div>
    </div>
  );
};

export default HomeRight;

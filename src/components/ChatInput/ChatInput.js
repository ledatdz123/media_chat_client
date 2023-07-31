import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsEmojiSmile, BsMicFill, BsSendFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { createMessage, createMessageImage } from "../../Redux/Message/Action";
import { useDispatch } from "react-redux";
import { BASE_API } from "../../config/api";
import axios from "axios";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
const ChatInput = ({
  content,
  setContent,
  currentChat,
  onChangeContentChat,
}) => {
  const [isCheckImage, setIsCheckImage] = useState(true);
  const [image, setImage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const token = localStorage.getItem("tokenChat");
  const dispatch = useDispatch();
  const handleCreateMessage = () => {
    dispatch(
      createMessage({
        token,
        data: { chatId: currentChat.id, content: content },
      })
    );
  };
  const uploadImage = async (pic) => {
    const data = new FormData();
    data.append("file", pic);
    const res = await axios({
      method: "POST",
      baseURL: `${BASE_API}/api/`,
      url: "upload",
      data: data,
    });
    console.log("image-----------current--------------", res);
    setImage(res.data.message);
  };
  const handleSendImage = () => {
    dispatch(
      createMessageImage({
        token,
        data: { chatId: currentChat.id, content: image },
      })
    );
    setImage("");
  };
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setContent(content + emoji);
  };
  console.log("cont-------------ent-----------", content);
  return (
    <div className="footer flex justify-center items-center relative">
      <div className="flex justify-center items-center mt-4">
      <div className="flex justify-between items-center space-x-3">
        <BsEmojiSmile
          onClick={() => {
            setShowEmoji(!showEmoji);
          }}
          className="cursor-pointer"
        />
        <label htmlFor="imageInput"><ImAttachment></ImAttachment></label>
      </div>
        <div className="flex flex-col">
          <input
            className="py-2 pl-3 pr-72 mr-5 outline-none border-none bg-white rounded-lg w-[85%]"
            placeholder="Type message"
            onChange={onChangeContentChat}
            value={content}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCreateMessage();
                setContent("");
              }
            }}
          />
          <input
            type="file"
            id="imageInput"
            className="hidden"
            onChange={(e) => uploadImage(e.target.files[0])}
          />
        </div>
      <div className="flex">
        <BsSendFill className="cursor-pointer" onClick={handleSendImage}></BsSendFill>
        <BsMicFill />
        <div className={`${!image ? "hidden": ""}
        absolute  bottom-10 left-36 `}>
          <img className="w-[60px] h-[60px] cursor-pointer object-fill"
            src={image}
          />
        </div>
        {showEmoji && (
          <div className="absolute bottom-10 left-6">
            <Picker
              data={data}
              emojiSize={18}
              emojiButtonSize={22}
              onEmojiSelect={addEmoji}
              maxFrequentRows={0}
            ></Picker>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default ChatInput;

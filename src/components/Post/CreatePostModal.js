import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import './CreatePostModal.css'
const CreatePostModal = ({ onClose, isOpen }) => {
  const [isDragOver, setIsDragOver]=useState(false)
  const [file, setFile]=useState()
  const [caption, setCaption]=useState()
  const handleDrop=(e)=>{
    e.preventDefault()
    const dropFile=e.dataTransfer.files[0]
    if(dropFile.type.startsWith("image/") || dropFile.type.startsWith("video/")){
      setFile(dropFile)
    }
  }
  const handleDragOver=(e)=>{
    e.preventDefault()
    e.dataTransfer.dropEffect="copy"
    setIsDragOver(true)
  }
  const handleDragLeave=(e)=>{
    setIsDragOver(false)
  }
  const handleChange=(e)=>{
    const file=e.target.files[0]
    if(file && (file.type.startsWith("image/") || file.type.startsWith("video/"))){
      setFile(file)
    }else{
      setFile(null)
      alert("Please select image or video")
    }
  }
  const handleCaptionChange=(e)=>{
    setCaption(e.target.value)
  }
  return (
    <div>
      <Modal size={"3xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <div className="flex justify-between px-10 items-center">
            <p>Create new post</p>
            <Button
              className=""
              variant={"ghost"}
              size={"sm"}
              colorScheme={"blue"}
            >
              Share
            </Button>
          </div>
          <hr />
          
          <ModalBody>
          <div className="h-[70vh] flex justify-between">
            <div className="w-[50%]">
              {!file && <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className="drag-drop h-full">
                <div className="flex flex-col items-center">
                  <FaPhotoVideo className="text-4xl mb-5"/>
                  <p>Drag Photos or Videos here</p>
                </div>
                <label htmlFor="file-upload" className="custom-file-upload">Select From Computer</label>
                <input className="fileInput" type="file" id="file-upload" accept="image/*, video/*"
                onChange={handleChange}/>
              </div>}
              {file && <img className="max-h-full" src={URL.createObjectURL(file)} alt=""/>}
            </div>
            <div className="w-[50%]">
              <div className="flex items-center px-2">
                <img className="w-7 h-7 rounded-full"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt=""/>
                <p className="ml-2 text-sm font-semibold">username</p>
              </div>
              <div className="px-2">
                <textarea 
                placeholder="write a caption"
                className="captionInput"
                name="caption"
                rows={"6"}
                onChange={handleCaptionChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <GrEmoji/>
                <p className="opacity-70">{caption?.length}/2,200</p>
              </div>
              <hr/>
              <div className="px-2 flex justify-between items-center">
                <input className="locationInput" type="text" placeholder="location" name="location"/>
                <GoLocation/>
              </div>
              <hr/>
            </div>
          </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreatePostModal;

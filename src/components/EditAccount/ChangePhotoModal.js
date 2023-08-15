import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const ChangePhotoModal = ({onOpen, isOpen, onClose, handleProfileImageChange}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader textAlign={"center"}>Modal Title</ModalHeader>
        <ModalBody>
          <div className='flex flex-col items-center'>
            <label className='font-bold text-blue-600 text-center cursor-pointer text-xs w-full'
            htmlFor='profileImage'>Upload Photo</label>
            <input type='file' id='profileImage' name='profileImage'/>
          </div>
          <hr/>
          <p className='font-bold py-3 text-red-600 text-center cursor-pointer'>Remove Photo</p>
          <p className='font-bold py-3 text-center cursor-pointer'
          onClick={onClose}
          >Cancel</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ChangePhotoModal
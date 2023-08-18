import {
  Button,
  ChakraProvider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ChangePhotoModal from "./ChangePhotoModal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { currentUserAction, updateUser } from "../../Redux/Auth/Action";

const EditAccount = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState(null);
  const token = localStorage.getItem("tokenChat");
  const toast = useToast();
  const { auth } = useSelector((store) => store);
  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    mobile: "",
    gender: "",
    website: "",
  });
  useEffect(() => {
    dispatch(currentUserAction(token));
  }, [token]);
  useEffect(()=>{
    console.log("reqUser", auth.reqUser)
    const newValue={}
    for(let item in initialValues){
      if(auth.reqUser && auth.reqUser[item]){
        newValue[item]=auth.reqUser[item]
      }
    }
    formik.setValues(newValue)
  }, [auth.reqUser])
  const formik = useFormik({
    initialValues: { ...initialValues },
    onSubmit: (value) => {
      const data = {
        jwt: token,
        data: { ...value, userId: auth.reqUser?.userId },
      };
      dispatch(updateUser(data));
      toast({
        title: "Account updated...",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  async function handleProfileImageChange(event) {
    const file = event.target.files[0];
    const image = "";
    setImageFile(image);
    const data = {
      jwt: token,
      data: {
        image: image,
        id: auth.reqUser?.userId,
      },
    };
    dispatch();
    onClose();
  }
  return (
    <ChakraProvider>
      <div className="border rounded-md p-10 px-32">
        <div className="flex pb-7">
          <div className="w-[15%]">
            <img
              className="w-8 h-8 rounded-full"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt=""
            />
          </div>
          <div>
            <p>username</p>
            <p
              onClick={onOpen}
              className="font-bold text-blue-800 cursor-pointer"
            >
              Change Profile Photo
            </p>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing="6">
            <FormControl className="flex" id="name">
              <FormLabel className="w-[15%]">Name</FormLabel>
              <div className="w-full">
                <Input
                  placeholder="Name"
                  className="w-full"
                  type="text"
                  {...formik.getFieldProps("name")}
                />
                <FormHelperText className="text-xs">
                  Help people discover account by using the name you are known
                  by: either your fullname, nickname, or bussiness name.
                </FormHelperText>
                <FormHelperText className="text-xs">
                  You can only change your name within 14 days
                </FormHelperText>
              </div>
            </FormControl>
            <FormControl className="flex" id="username">
              <FormLabel className="w-[15%]">UserName</FormLabel>
              <div className="w-full">
                <Input placeholder="UserName" className="w-full" type="text" 
                {...formik.getFieldProps("username")}/>
                <FormHelperText className="text-xs">
                  In most cases, you'll be able to change your username back to
                  for another 14 days. Learn more
                </FormHelperText>
              </div>
            </FormControl>
            <FormControl className="flex" id="website">
              <FormLabel className="w-[15%]">Website</FormLabel>
              <div className="w-full">
                <Input placeholder="Website" className="w-full" type="text" />
                <FormHelperText className="text-xs">
                  Edit your links is only available on mobile. Visit the
                  Instagram app and edit your profile to change the website in
                  your bio.
                </FormHelperText>
              </div>
            </FormControl>
            <FormControl className="flex" id="bio">
              <FormLabel className="w-[15%]">Bio</FormLabel>
              <div className="w-full">
                <Textarea placeholder="Bio" className="w-full" type="text" 
                {...formik.getFieldProps("bio")}/>
              </div>
            </FormControl>

            <div className="py-10">
              <p className="font-bold text-sm">Personal Information</p>
              <p className="text-xs">
                Provide your personal information, even if the account is used
                for a bussiness, a pet or something else. This won't be a part
                your public profile.
              </p>
            </div>

            <FormControl className="flex" id="email">
              <FormLabel className="w-[15%]">Email</FormLabel>
              <div className="w-full">
                <Input placeholder="Email" className="w-full" type="text" 
                {...formik.getFieldProps("email")}/>
              </div>
            </FormControl>
            <FormControl className="flex" id="mobile">
              <FormLabel className="w-[15%]">Mobile</FormLabel>
              <div className="w-full">
                <Input placeholder="Mobile" className="w-full" type="text" 
                {...formik.getFieldProps("mobile")}/>
              </div>
            </FormControl>
            <FormControl className="flex" id="gender">
              <FormLabel className="w-[15%]">Gender</FormLabel>
              <div className="w-full">
                <Input placeholder="Gender" className="w-full" type="text" 
                {...formik.getFieldProps("gender")}/>
              </div>
            </FormControl>
            <div>
              <Button colorScheme="blue" type="submit" className="">
                submit
              </Button>
            </div>
          </Stack>
        </form>
        <ChangePhotoModal
          handleProfileImageChange={handleProfileImageChange}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
      </div>
    </ChakraProvider>
  );
};

export default EditAccount;

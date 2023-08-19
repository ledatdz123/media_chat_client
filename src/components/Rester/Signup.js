import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { signupAction } from "../../Redux/Auth/Action";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const initialValues = { email: "", username: "", password: "", role: "USER"};
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSubmit = (values, actions) => {
    console.log(values)
    dispatch(signupAction(values))
    actions.setSubmitting(false)
  };
  const {auth}=useSelector(store=>store)
  console.log('signup',auth)
  useEffect(()=>{
    if(auth?.signup?.code==='200'){
      navigate("/login")
    }
  }, [auth.reqUser])
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3,"Invalid email address").required("Required"),
    email: Yup.string().min(3,"Invalid email address").required("Required"),
    password: Yup.string()
      .min(1, "Password must be at least 8 character")
      .required("password is required"),
  });
  return (
    <div>
      <div className="ml-auto mr-auto w-2/4">
      <ChakraProvider>
        <Box
          p={20}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <img className="mb-5" src="https://i.imgur.com/zqpwkLQ.png" />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <Form className="space-y-8">
                <Field name="username">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                    >
                      <Input
                        className="w-full border"
                        {...field}
                        id="username"
                        placeholder="Mobile Number or Username"
                      ></Input>
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <Input
                        className="w-full border"
                        {...field}
                        id="email"
                        placeholder="Email"
                      ></Input>
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>


                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <Input
                        className="w-full border"
                        {...field}
                        id="password"
                        placeholder="Password"
                      ></Input>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <div>
                <p className="text-center">
                  People who use our service may have uploaded your contact
                  information to Instagram. Learn more
                </p>
                <p className="text-center">
                  By signing up, you agree to ours Terms, Privacy Policy and
                  Cookies Policy
                </p>
                </div>
                <Button
                  className="w-full"
                  mt={4}
                  backgroundColor={"blue"}
                  type="submit"
                  isLoading={formikProps.isSubmitting}
                >
                  Signup
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        </ChakraProvider>
      </div>
    </div>
  )
}

export default Signup
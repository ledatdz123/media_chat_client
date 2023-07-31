import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { signupAction } from "../../Redux/Auth/Action";

const Signup = () => {
  const initialValues = { username: "", password: "" };
  const dispatch=useDispatch()
  const handleSubmit = (values, actions) => {
    console.log(values)
    dispatch(signupAction(values))
    actions.setSubmitting(false)
  };
  const isuser=useSelector(store=>store.signup)
  console.log('signup',isuser)
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3,"Invalid email address").required("Required"),
    password: Yup.string()
      .min(1, "Password must be at least 8 character")
      .required("password is required"),
  });
  return (
    <div>
      <div>
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
                <p className="text-center">
                  People who use our service may have uploaded your contact
                  information to Instagram. Learn more
                </p>
                <p className="text-center">
                  By signing up, you agree to ours Terms, Privacy Policy and
                  Cookies Policy
                </p>
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
      </div>
    </div>
  )
}

export default Signup
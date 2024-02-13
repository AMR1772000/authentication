import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/AuthSlice";
import eyeImage from "../assets/eye.png";

const LogIn = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [register, setRegister] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const userError = useSelector((state) => state.user.error);
  const userRegister = useSelector((state) => state.user.register);

  useEffect(() => {
    setError(userError);
    setRegister(userRegister);
  }, [userError, userRegister]);

  const submit = () => {
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(getUsers(data));
    console.log(userError);
  };

  return (
    <>
      <h1 className="w-[400px] flex text-center justify-center font-semibold text-[28px] mt-[5%] relative left-[35%] ">
        Log In
      </h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {

          submit(values);
          setSubmitting(false);
        }}
      >
        <Form className="flex flex-col w-[400px] h-[350px] relative left-[35%] mt-[40px] rounded-md border border-solid border-black" >
          {/* email  */}
          <label
            className="text-[14px] font-medium tracking-[0.28px] leading-5 mb-1 mt-9 mx-3"
            htmlFor="email"
          >
            Email Address
          </label>
          <Field
            className="bg-[#F2F2F2] p-3 rounded h-[44px] mb-3 mx-3"
            name="email"
            type="email"
            innerRef={emailRef}
          />
          <ErrorMessage
            className="text-red-600 text-[16px] mx-3"
            name="email"
            component="div"
          />
          {/* password */}
          <label
            className="text-[14px] font-medium tracking-[0.28px] leading-5 mb-1 mt-5 mx-3"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex flex-row h-[44px]">
            <Field
              className="bg-[#F2F2F2] p-3 rounded-tl rounded-bl h-[44px] w-[340px] mb-3 ml-3"
              name="password"
              type={showPassword ? "text" : "password"}
              innerRef={passwordRef}
            />
            <button
              className="flex justify-center items-center bg-[#F2F2F2] rounded-tr rounded-br mr-3 w-[30px]"
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              <img
                className="w-[20px] h-[20px] flex justify-center items-center"
                src={eyeImage}
                alt="eye"
              />
            </button>
          </div>

          <ErrorMessage
            className="text-red-600 text-[16px] mx-3"
            name="password"
            component="div"
          />
          {error ? (
            <div className="text-red-600 text-[16px] mx-3">{error}</div>
          ) : null}
          {register ? (
            <div className="text-green-600 text-[16px] mx-3">{register}</div>
          ) : null}
          <button
            className="bg-[#2F80ED] rounded-md flex justify-center items-center h-[43px] text-[15px] font-medium leading-5 text-white mt-[33px] mb-3 mx-3"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default LogIn;

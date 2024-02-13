import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { insertUser } from "../store/AuthSlice";
import { useRef } from "react";
import { Link } from "react-router-dom";
import eyeImage from "../assets/eye.png";
const SignUp = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    setIsSubmitting(true);
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(insertUser(data));
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setIsSubmitting(false);
  };
  return (
    <>
      <h1 className="w-[400px] flex text-center justify-center font-semibold text-[28px] mt-[5%] relative left-[35%] ">
        Sign Up
      </h1>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(7, "Password must be at least 7 characters")
            .matches(
              /^(?=.*[A-Z])(?=.*[!@#$%^&?*()-+])(?=.{7,})/,
              "Password must contain at least one uppercase letter, one number and one special character"
            )
            .required("Required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password confirmation is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          submit(values);
          setSubmitting(false);
        }}
      >
        <Form className="flex flex-col w-[400px] relative left-[35%] mt-[40px] rounded-md border border-solid border-black">
          {/* email  */}
          <label
            className="text-[14px] font-medium tracking-[0.28px] leading-5 mb-1 mt-3 mx-3"
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
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              type="button"
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

          {/* confirm password */}
          <label
            className="text-[14px] font-medium tracking-[0.28px] leading-5 mb-1 mt-5 mx-3"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="flex flex-row h-[44px]">
            <Field
              className="bg-[#F2F2F2] p-3 rounded-tl rounded-bl h-[44px] w-[340px] mb-3 ml-3"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
            />
            <button
              className="flex justify-center items-center bg-[#F2F2F2] rounded-tr rounded-br mr-3 w-[30px]"
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
              type="button"
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
            name="confirmPassword"
            component="div"
          />
          {error && (
            <div className="text-red-600 text-[16px] mx-3">{error}</div>
          )}
          {isSubmitting ? (
            <button
              className="bg-[#2F80ED] rounded-md flex justify-center items-center h-[43px] text-[15px] font-medium leading-5 text-white mt-[33px] mb-3 mx-3"
              type="button"
              disabled
            >
              Submit
            </button>
          ) : (
            <button
              className="bg-[#2F80ED] rounded-md flex justify-center items-center h-[43px] text-[15px] font-medium leading-5 text-white mt-[33px] mb-3 mx-3"
              type="submit"
            >
              <Link to="/welcome">Submit</Link>
            </button>
          )}
        </Form>
      </Formik>
      <p className="text-gray-700 text-[16px] relative left-[40%] top-3">
        Already have an account?
        <Link className="text-[#2F80ED]" to="login">
          Login
        </Link>
      </p>
    </>
  );
};

export default SignUp;

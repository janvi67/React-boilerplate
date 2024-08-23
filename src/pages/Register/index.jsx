import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { RegisterUser } from "../../api/Auth";
import "react-toastify/dist/ReactToastify.css";
import { toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";
import { getAuthData } from "../../utils/Auth";

const schema = yup.object({
  first_name: yup.string().required("please fill your first name"),
  last_name: yup.string().required("please fill your last_name"),
  email: yup.string().required("please fill your mail id"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Password not match "),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You should accept privacy policy"),
});

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
     
      confirmPassword: "",
      termsAccepted: false,
    },
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  console.log(errors);
  const formSubmit = async (data) => {
    console.log("FORM DATA", data);

    try {
      const body = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
      };
      const response = await RegisterUser(body);

      if (response.data) {
        toast.success("SignUp Successful", {
          autoClose: 2000,
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      reset();
    }

    // useEffect(()=>{
    //   const authData = getAuthData();
    //   if (authData.email===data.email) {
    //    toast.error("this email is already exists please provide unique email")
    //   }
    // })
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <form
        action="#"
        className="main"
        onSubmit={handleSubmit(formSubmit)}
        noValidate
      >
        <div className="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <div>
            <label htmlFor="first_name">
              <b>First Name</b>
              <input
                type="text"
                className="input-2"
                placeholder="Enter First Name"
                name="first_name"
                id="first_name"
                {...register("first_name")}
              />
              <p className="error">{errors.first_name?.message}</p>
              <br />
            </label>
          </div>
          <div>
            <label htmlFor="last_name"> </label>
            <b>Last Name</b>
            <input
              type="text"
              className="input-2"
              placeholder="Enter last Name"
              name="last_name"
              id="last_name"
              {...register("last_name")}
            />
            <p className="error">{errors.last_name?.message}</p>
          </div>
          <br />
          <div>
            <label className="email-flex" htmlFor="email"></label>
            <b>Email</b>
            <input
              type="email"
              className="input-2"
              placeholder="Enter Email"
              name="email"
              id="email"
              {...register("email")}
            />
            <p className="error">{errors.email?.message}</p>
            <br />
          </div>
          <div>
            <div className="input-wrapper">
              <label htmlFor="password"> </label>
              <b>Password</b>

              <input
                type={showPassword ? "text" : "password"}
                className="input-2"
                placeholder="Enter Password"
                name="password"
                id="password"
                
                {...register("password")}
              />
              <button
                type="button"
                className="btnShowPwd"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
             
            </div>
            <p className="error">{errors.password?.message}</p>
            <br />
          </div>
          <label htmlFor="confirmPassword"></label>
          <b>Confirm Password</b>
          <input
            type="password"
            className="input-3"
            placeholder="Repeat Password"
            name="confirmPassword"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          <p className="error">{errors.confirmPassword?.message}</p>
          <hr />
          <p>
            By creating an account you agree to our{" "}
            <a href="#">Terms & Privacy</a>.
          </p>
          <input
            type="checkbox"
            name=" termsAccepted"
            id=" termsAccepted"
            {...register("termsAccepted")}
          />{" "}
          I Agree to the
          <a href="#">Terms & Privacy</a>
          <p className="error">{errors.termsAccepted?.message}</p>
          <br />
          <br />
          <button type="submit" className="registerbtn">
            Register
          </button>
        </div>
        <div className="container signin">
          <p>
            Already have an account? <a href="Login">Sign in</a>.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;

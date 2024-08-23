import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { LoginUser } from "../../api/Auth";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setAuthData, getAuthData, clearAuthData } from "../../utils/Auth.js"; // Adjust the import path as needed

import "./Login.css";
import { useDispatch } from "react-redux";
import { login, logout} from "../../store/slices/userAuth.js";

const schema = yup.object({
  email: yup.string().required("please fill your mail id"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const authData = getAuthData();
    if (authData.email) {
      setEmail(authData.email);
      setRememberMe(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  console.log(errors);
  const formSubmit = async (data) => {
    try {
      const body = {
        email: data.email,
        password: data.password,
      };
      const response = await LoginUser(body);
      const { userData, token } = response.data.data;
      if(userData&&token){
      const obj = {
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        name: userData.name,
        token: token,
        id: userData._id,
      };

      setAuthData(token, email);
      dispatch(login(obj));
     
    

      toast.success("Login Successful", {
        autoClose: 2000,
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/usersListt");
      }, 4000);}
      else{
        throw new Error("invalid login data")
      }
    } catch (error) {
      toast.error(`login fail`);
      console.log(error);
    }
  };

  return (
    <div className="con">
      <ToastContainer />
      <div className="login-container">
        <form
          action="#"
          className="login-form"
          onSubmit={handleSubmit(formSubmit)}
          noValidate
        >
          <div>
            <div>
              {" "}
              <h1>Login</h1>
            </div>
            <br></br>
            <div>
              <label htmlFor="email"></label>
              <b>Email</b>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                id="email"
                {...register("email")}
              />
              <p className="error">{errors.email?.message}</p>
              <br />
            </div>
            <label htmlFor="password"></label>
            <b>Password</b>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              id="password"
              {...register("password")}
            />
            <p className="error">{errors.password?.message}</p>
            <br />
            <center>
              <button type="submit" className="login-button">
                Login
              </button>
            </center>
          </div>
          <center>
            <div className="dar">
              Don't have an account?&nbsp;&nbsp;
              <a href="/Register">Register here</a>
            </div>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Login;

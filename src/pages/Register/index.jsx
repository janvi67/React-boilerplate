import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm} from "react-hook-form";
import './Register.css'


const schema=yup.object({
    first_name:yup.string().required("please fill your first name"),
    last_name:yup.string().required("please fill your last_name"),
    email:yup.string().required("please fill your mail id"),
    password:yup.string().required("please fill your password"),
    confirmPassword:yup.string().required("please fill your confirm password"),
    termsAccepted:yup.string().required("please check terms and conditions")

})
function Register() {

    const form = useForm({
        defaultValues: {
          first_name: "",
          last_name: "",
          email: "",
          password:"",
          confirmPassword:"",
          termsAccepted:""
        },
        resolver: yupResolver(schema),
      });

      const { register, control, handleSubmit, formState:{errors} } = form;
    //   const { errors } = formState;
  return (
    <div>







    </div>
  )
}

export default Register
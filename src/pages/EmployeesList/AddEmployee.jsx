import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AddEmp, UpdateEmp } from "../../api/Auth";
import "../EmployeesList/AddEmployee.css";

const schema = yup.object({
  name: yup.string().required("please fill your name"),
  email: yup.string().required("please fill your email id"),
  phone: yup.number().required("please fill your phone number"),
  website: yup
    .string()
    .required("Please enter website")
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    ),

  company: yup.string().required("website name  is required"),
});
yupResolver(schema);
function AddEmployee() {
  const [setName] = useState("");
  const [setEmail] = useState("");
  const [setPhone] = useState("");
  const [setWebsite] = useState("");
  const [setCompany] = useState("");
  const navigate = useNavigate();
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  // const handleEdit=async()=>{

  //  try {
  //   if (response.status === 200) {
  //     const employee = response.data.data;
  //     setName(employee.name);
  //     setEmail(employee.email);
  //     setPhone(employee.phone);
  //     setWebsite(employee.website);
  //     setCompany(employee.company);
  // }
    
  //  } catch (error) {
  //   toast.error("Failed to fetch employee details.", { autoClose: 2000, position: "top-center" });
    
  //  }
  //   const response = await UpdateEmp(body);


  // }
  // console.log(errors);
  const formSubmit = async (data) => {
    console.log("FORM DATA", data);
    // handleEdit();

    try {
      const body = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        website: data.website,
        company: data.company,
      };
      const response = await AddEmp(body);

      if (response.data) {
        toast.success("Add Employee Successful", {
          autoClose: 2000,
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/EmployeesList");
        }, 4000);
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      reset();
    }
  };
  return (
    <div>
      <form
        action="#"
        className="main"
        onSubmit={handleSubmit(formSubmit)}
        noValidate
      >
        <div className="container">
          <h1>Add Empolyeee</h1>
          <p>Please fill in this form to add an employee.</p>
          <hr />
          <div>
            <label htmlFor="name">
              <b>Name</b>
              <input
                type="text"
                className="input-2 name"
                placeholder="Enter your  Name"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                {...register("name")}
              />
              <p className="error">{errors.name?.message}</p>
              <br />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              {" "}
              <b>email</b>
            </label>

            <input
              type="email"
              placeholder="Enter your email id "
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              {...register("email")}
            />
            <p className="error">{errors.phone?.message}</p>
            <br />
          </div>

          <div>
            <label htmlFor="phone">
              {" "}
              <b>phone</b>
            </label>

            <input
              type="tel"
              className="input-2"
              placeholder="Enter your phone number"
              name="phone"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              {...register("phone")}
            />
            <p className="error">{errors.phone?.message}</p>
            <br />
          </div>
          <div>
            <label htmlFor="website">
              {" "}
              <b>website</b>
            </label>

            <input
              type="text"
              className="website"
              placeholder="Enter your website name"
              name="website"
              id="website"
              onChange={(e) => setWebsite(e.target.value)}
              {...register("website")}
            />
            <p className="error">{errors.website?.message}</p>
            <br />
          </div>
          <div>
            <label htmlFor="website">
              {" "}
              <b>Company</b>
            </label>

            <input
              type="text"
              className="company"
              placeholder="Enter your company name"
              name="company"
              id="company"
              onChange={(e) => setCompany(e.target.value)}
              {...register("company")}
            />
            <p className="error">{errors.company?.message}</p>
            <br />
          </div>
          <button type="submit" className="registerbtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;

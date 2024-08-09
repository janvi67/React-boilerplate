import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AddEmp, DeleteEmp, UpdateEmp } from "../../api/employees";
import "../EmployeesList/AddEmployee.css";
import { useParams } from "react-router-dom";
import { fetchEmployee } from "../../api/employees";

const schema = yup.object({
  name: yup.string().required("please fill your name"),
  email: yup
    .string()
    .required("please fill your email id")
    .email("please fill correct email id"),
  phone: yup
    .number()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    )
    .nullable()
    .required("please fill your phone no"),
  website: yup
    .string()
    .required("Please enter website")
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    ),

  company: yup.string().required("website name  is required"),
});

function AddEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      company: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      GetEmPloyee();
    }
  }, [id]);

  const formSubmit = async (data) => {
    try {
      if (id) {
        const response2 = await UpdateEmp({
          id,
          body: data,
        });

        if (response2.data) {
          toast.success("edit Employee Successful", {
            autoClose: 2000,
            position: "top-center",
          });
        }
        setTimeout(() => {
          navigate("/EmployeesList");
        }, 4000);
      } else {
        const response = await AddEmp(data);
        if (response.data) {
          toast.success("add Employee Successful", {
            autoClose: 2000,
            position: "top-center",
          });

          setTimeout(() => {
            navigate("/EmployeesList");
          }, 4000);
        }
      }
    } catch (error) {
      toast.error(error);
      reset();
    }
  };

  const GetEmPloyee = async () => {
    const response = await fetchEmployee({ id });
    console.log(response);
    try {
      if (response) {
        const employee = response.data.data;
        setValue("name", employee.name);
        setValue("email", employee.email);
        setValue("phone", employee.phone);
        setValue("website", employee.website);
        setValue("company", employee.company);
      }
    } catch (error) {}
  };

  return (
    <div>
      <form className="main" onSubmit={handleSubmit(formSubmit)} noValidate>
        <div className="container">
          <h1>{id ? "Edit Employee" : "Add Employeee"}</h1>
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
              {...register("email")}
            />
            <p className="error">{errors.email?.message}</p>
            <br />
          </div>

          <div>
            <label htmlFor="phone">
              {" "}
              <b>phone</b>
            </label>

            <input
              type="number"
              className="input-2"
              placeholder="Enter your phone number"
              name="phone"
              id="phone"
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
              {...register("company")}
            />
            <p className="error">{errors.company?.message}</p>
            <br />
          </div>
          <button type="submit" className="registerbtn">
            {id ? "submit" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;

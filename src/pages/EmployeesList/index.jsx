import React, { useEffect, useState } from "react";
import { employeesList } from "../../api/employees";
import "./EmployeesList.css";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Pagination from "../Pagination";
import NavBar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { DeleteEmp } from "../../api/employees";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { empData } from "../../store/slices/employeeAuth";

function Employee() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
const dispatch=useDispatch()
  const generateItemsPerPageOptions = () => {
    const options = [];
    for (let i = 0; i < 3; i++) {
      options.push(
        <option key={i} value={2 * i + 3}>
          {2 * i + 3}
        </option>
      );
    }
    return options;
  };

  const emp = async () => {
    try {
     
      const response = await employeesList({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
      }
      
    );
    const { data } = response.data.data.data;
    if(data){
    const obj = {
      id:data._id,
      name:data.name,
      email:data.email,
      phone:data.phone,
      website:data.website,
      company:data.company,
    };
    console.log("empobj",obj)
      setData(response.data.data.data);
      setTotalRecords(response.data.data.total);
      setPages(Math.ceil(response.data.data.total / itemsPerPage));
  dispatch(empData(obj))
      console.log("empres",response)
    } }catch (error) {
      console.log(error);
      setError(error);
    }
   
  };
  // useEffect(() => {
  //   setCurrentPage(2);
  // }, [searchQuery]);

  useEffect(() => {
    emp();
  }, [currentPage, itemsPerPage, searchQuery]);
  if (error) return <p>Error: {error.message}</p>;

  const handleCreate = () => {
    navigate("/AddEmployee");
  };

  const handleEdit = (id) => {
    navigate(`/Editemployee/${id}`);
  };
  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response3 = await DeleteEmp(id);
        if (response3.data) {
          setData(data.filter((employees) => employees._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          toast.error("failed to delete employee");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        /* Read more about handling dismissals below */

        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
  };
  return (
    <div>
      <NavBar setSearchQuery={setSearchQuery} />
      <h1>Employees list</h1>
      <label className="label">Rows Per Page</label>
      <select
        className="drop-down"
        onChange={(e) => {
          setCurrentPage(1);
          setItemsPerPage(e.target.value);
        }}
        value={itemsPerPage}
      >
        {generateItemsPerPageOptions()}
      </select>
      <br></br>
      <br></br>

      <div className="btnCreate-container">
        <button className="btn-create" onClick={handleCreate}>
          Add
        </button>
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((employees,index) => (
            <tr key={employees.id||index}>
              <td>{employees.name}</td>
              <td>{employees.email}</td>
              <td>{employees.phone}</td>
              <td>{employees.website}</td>
              <td>{employees.company}</td>
              <td>
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(employees._id)}
                >
                  <AiFillEdit />
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(employees._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        nPages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Employee;

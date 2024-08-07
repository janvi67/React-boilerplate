import React, { useEffect, useState } from "react";
import { employeesList } from "../../api/employees";
import "./EmployeesList.css";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Pagination from "../Pagination";
import NavBar from "../Navbar";
import { useNavigate } from "react-router-dom";

function Employee() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      });
      console.log("response", response);
      setData(response.data.data.data);
      setTotalRecords(response.data.data.total);
      setPages(Math.ceil(response.data.data.total / itemsPerPage));
    } catch (error) {
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
    navigate(`/AddEmployee/${id}`);
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
          {data.map((employees) => (
            <tr key={employees.id}>
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
                  //   onClick={() => handleDelete(user._id)}
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

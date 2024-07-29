import React, { useEffect } from "react";
import { fetchEmployeeList } from "../../api/employee";

function Home() {
  const employeeeApiList = async () => {
    try {
      const response = await fetchEmployeeList();
      console.log("response",response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    employeeeApiList();
  },[])
  
  return <div>Home</div>;
}

export default Home;

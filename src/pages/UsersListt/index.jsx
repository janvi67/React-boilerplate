import React,{useEffect,useState} from 'react'
import './UsersListtt.css'
import {usersList } from "../../api/users";


      
function UsersListt() {

    const [data, setData] = useState([]);

    const userList = async () => {
        try {
          const response = await usersList();
    
          setData(response.data.data.data)   
          console.log("response",response);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(()=>{
        userList();
      },[])
     
  return (
    <div> UsersListt
     <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user,index) => (
                            
                            <tr key={user.id||index}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                            </tr>
                            
                        ) )
                      
                        }
                      
                           
                    </tbody>
                </table>

    
    
    </div>
  )
}

export default UsersListt
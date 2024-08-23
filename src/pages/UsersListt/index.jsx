import React,{useEffect,useState} from 'react'
import './UsersListtt.css'
import {usersList } from "../../api/users";
import { useSelector } from 'react-redux';

      
function UsersListt() {

    const [data, setData] = useState([]);
const user =  useSelector((state)=>state.root.userReducer.user)
console.log('user',user)
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
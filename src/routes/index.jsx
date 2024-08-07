import React, { lazy } from 'react'
import {Routes,Route} from "react-router-dom"



const Home=lazy(()=> import("../pages/Home"))
const Login=lazy(()=> import("../pages/Login"))
const Regiter=lazy(()=> import("../pages/Register"))
const UsersListt=lazy(()=>import("../pages/UsersListt"))
const EmployeesList=lazy(()=>import("../pages/EmployeesList"))
const AddEmployee=lazy(()=>import("../pages/EmployeesList/AddEmployee"))
const NavBar=lazy(()=>import("../pages/Navbar"))
const Pagination=lazy(()=>import("../pages/Pagination"))
function Router() {

  return (
    <div>
    
    <Routes>
      
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Regiter/>}/>
      <Route path='/usersListt' element={<UsersListt/>}/>
      <Route path='/employeesList' element={<EmployeesList/>}/>
     <Route path='/AddEmployee' element={<AddEmployee/>}/>
     <Route path='/Navbar' element={<NavBar/>}/>
     <Route path='/pagination' element={<Pagination/>}/>
      </Routes>
      
    
    
    
    
    
    
    
    
    
    </div>
  )
}

export default Router
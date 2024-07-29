import React, { lazy } from 'react'
import {Routes,Route} from "react-router-dom"


const Login=lazy(()=> import("../pages/Login"))
const Home=lazy(()=> import("../pages/Home"))

function Router() {

  return (
    <div>
    
    <Routes>
      
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
   
     
      </Routes>
      
    
    
    
    
    
    
    
    
    
    </div>
  )
}

export default Router
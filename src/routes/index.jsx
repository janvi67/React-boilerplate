import React, { lazy } from 'react'
import {Routes,Route} from "react-router-dom"

const Home=lazy(()=> import("../pages/Home"))
const Login=lazy(()=> import("../pages/Login"))
const Regiter=lazy(()=> import("../pages/Register"))

function Router() {

  return (
    <div>
    
    <Routes>
      
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Regiter/>}/>
   
     
      </Routes>
      
    
    
    
    
    
    
    
    
    
    </div>
  )
}

export default Router
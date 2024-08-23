import React from 'react'
import ReactDOM from 'react-dom/client'


import {BrowserRouter } from 'react-router-dom'

import './index.css'
import Layout from './layout/index.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
   <Layout/>
  </BrowserRouter>,
)

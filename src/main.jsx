import React from 'react'
import ReactDOM from 'react-dom/client'


import {BrowserRouter } from 'react-router-dom'

import './index.css'
import Layout from './layout/index.jsx'
import { Provider } from 'react-redux'
import store, { persistedStore } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
  <Provider store={store}>
  <PersistGate persistor={persistedStore}>
   <Layout/>
   </PersistGate>
   </Provider>
  </BrowserRouter>,
)

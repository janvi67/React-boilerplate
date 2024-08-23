import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './slices/userAuth'
import employeeReducer from './slices/employeeAuth'
export default combineReducers({
    userReducer,
    employeeReducer


})
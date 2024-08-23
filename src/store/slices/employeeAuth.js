import { createSlice } from "@reduxjs/toolkit";

const employeeAuthSlice=createSlice({
    name:"employeeAuthSlice",
    initialState:{
        employee:null,
    },
    reducers:{
        empData(state,action){
            state.employee=action.payload;
        },
    }
})
const {actions,reducer}=employeeAuthSlice
export const {empData}=actions
export default reducer
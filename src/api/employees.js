import AxiosWrapper from "../services/ApiConfig";
export const employeesList= async({page,limit,search})=>{
  
    return AxiosWrapper.get({
        endpoint:`employee/list`,
        page,
        limit,
        search
    }).then((response)=>{
        return {
            status:response.status,
            data:response.data
        };
    })
.catch((error)=>{
    throw error
});


}
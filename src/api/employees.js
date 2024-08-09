import AxiosWrapper from "../services/ApiConfig";
export const employeesList = async ({ page, limit, search }) => {
  return AxiosWrapper.get({
    endpoint: `employee/list`,
    page,
    limit,
    search,
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchEmployee = async ({ id }) => {
  return AxiosWrapper.getById({
    endpoint: `employee/get-details`,
    id,
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      throw error;
    });
};
export const UpdateEmp = async ({id,body}) => {
  return AxiosWrapper.put({
    endpoint: `employee/update`,
    id,
    body,
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
          status:error.response.status,
          code:error.code
        };
      throw error;
    });
};
export const AddEmp = async (body) => {
    return AxiosWrapper.post({
      endpoint: "employee/create",body
    })
      .then((response) => {
        return {
          status:response.status,
          data:response.data
        };
      })
      .catch((error) => {
          // return {
          //     status:error.response.status,
          //     code:error.code
          //   };
          throw error 
      });
  };
  export const DeleteEmp = async (id) => {
    return AxiosWrapper.delete({
      endpoint: `employee/delete/${id}`,
      
     
    })
      .then((response) => {
        return {
          status: response.status,
          data: response.data,
        };
      })
      .catch((error) => {
        return {
            status:error.response.status,
            code:error.code
          };
        throw error;
      });
  };
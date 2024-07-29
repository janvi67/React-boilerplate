import AxiosWrapper from "../services/ApiConfig";

export const fetchEmployeeList = async () => {
  return AxiosWrapper.get({
    endpoint: "posts",
  })
    .then((response) => {
      return {
        status:response.status,
        data:response.data
      };
    })
    .catch((error) => {
        return {
            status:error.response.status,
            code:error.code
          };
    });
};

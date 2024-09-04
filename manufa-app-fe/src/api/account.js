import axiosClient from './axiosClient';
export const getUserByLogin = (name, pass) => {
    return axiosClient.get(`https://localhost:44305/api/Account/GetUserByLogin?name=${name}&password=${pass}`);
}
export const getAllUser = () => {
    return axiosClient.get(`https://localhost:44305/api/Account/GetAllUser`);
}
export const createUser = (data) => {
    return axiosClient.post(`https://localhost:44305/api/Account/CreateUser`, data);
}
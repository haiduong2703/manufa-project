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
export const updateUser = (id, data) => {
    return axiosClient.post(`https://localhost:44305/api/Account/UpdateUser?accountId=${id}`, data);
}
export const getStaffById = (id) => {
    return axiosClient.get(`https://localhost:44305/api/Account/GetStaffById?Id=${id}`);
}
export const changeStatusStaff = (id, status) => {
    return axiosClient.post(`https://localhost:44305/api/Account/ChangeStatusStaff?Id=${id}&isActive=${status}`);
}
export const deletedStaffById = (id) => {
    return axiosClient.delete(`https://localhost:44305/api/Account/DeletedStaffById?Id=${id}`);
}
import axiosClient from './axiosClient';
export const BASE_URL = process.env.REACT_APP_BASE_API_URL?.replaceAll('"', '');
export const getUserByLogin = (name, pass) => {
    return axiosClient.get(`${BASE_URL}api/Account/GetUserByLogin?name=${name}&password=${pass}`);
}
export const getAllUser = () => {
    return axiosClient.get(`${BASE_URL}api/Account/GetAllUser`);
}
export const createUser = (data) => {
    return axiosClient.post(`${BASE_URL}api/Account/CreateUser`, data);
}
export const updateUser = (id, data) => {
    return axiosClient.post(`${BASE_URL}api/Account/UpdateUser?accountId=${id}`, data);
}
export const getStaffById = (id) => {
    return axiosClient.get(`${BASE_URL}api/Account/GetStaffById?Id=${id}`);
}
export const changeStatusStaff = (id, status) => {
    return axiosClient.post(`${BASE_URL}api/Account/ChangeStatusStaff?Id=${id}&isActive=${status}`);
}
export const deletedStaffById = (id) => {
    return axiosClient.delete(`${BASE_URL}api/Account/DeletedStaffById?Id=${id}`);
}
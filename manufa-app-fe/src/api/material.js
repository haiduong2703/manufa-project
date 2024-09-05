import axiosClient from './axiosClient';
export const getAllMaterial = () => {
    return axiosClient.get(`https://localhost:44305/api/Material/GetAllMaterial`);
}
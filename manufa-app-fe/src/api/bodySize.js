import axiosClient from "./axiosClient";
export const BASE_URL = process.env.REACT_APP_BASE_API_URL?.replaceAll('"', "");
const END_POINT = {
  BODYSIZE: "BodySizeComponent",
  PORT: 44305,
};

export const createBodySize = (data) => {
  return axiosClient.post(
    `${BASE_URL}api/${END_POINT.BODYSIZE}/CreateBodySize`,
    data
  );
};

export const updateBodySize = (data) => {
  return axiosClient.post(
    `${BASE_URL}api/${END_POINT.BODYSIZE}/UpdateBodySize`,
    data
  );
};

export const deleteBodySize = (id) => {
  return axiosClient.delete(
    `${BASE_URL}api/${END_POINT.BODYSIZE}/DeleteBodySize?Id=${id}`
  );
};

export const getAllBodySize = (pageNumber, pageSize) => {
  return axiosClient.get(
    `${BASE_URL}api/${END_POINT.BODYSIZE}/GetAllBodySize?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
};

export const getAllComponentType = () => {
  return axiosClient.get(
    `${BASE_URL}api/${END_POINT.BODYSIZE}/GetAllComponentType`
  );
};

export const getBodySizeById = (id) => {
  return axiosClient.get(
    `${BASE_URL}api/${END_POINT.BODYSIZE}/GetBodySizeById?Id=${id}`
  );
};

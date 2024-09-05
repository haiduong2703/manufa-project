import axiosClient from "./axiosClient";
export const BASE_URL = process.env.REACT_APP_BASE_API_URL?.replaceAll('"', '');
const END_POINT = {
  BODYSIZE: "BodySizeComponent",
  PORT: 44305,
};

export const createBodySize = () => {
  return axiosClient.get(
    `${BASE_URL}api/${END_POINT.BODYSIZE}/CreateBodySize`
  );
};

export const updateBodySize = () => {
  return axiosClient.get(
    `${BASE_URL}api/${END_POINT.BODYSIZE}/UpdateBodySize`
  );
};

export const deleteBodySize = () => {
  return axiosClient.get(
    `${BASE_URL}api/${END_POINT.BODYSIZE}/DeleteBodySize`
  );
};

export const getAllBodySize = (pageNumber, pageSize) => {
  return axiosClient.get(
    `${BASE_URL}api/${END_POINT.BODYSIZE}/GetAllBodySize?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
};

export const getBodySizeById = () => {
  return axiosClient.get(
    `${BASE_URL}api/${END_POINT.BODYSIZE}/GetBodySizeById`
  );
};

import axiosClient from "./axiosClient";

const END_POINT = {
  BODYSIZE: "BodySizeComponent",
  PORT: 44305,
};

export const createBodySize = () => {
  return axiosClient.get(
    `https://localhost:${END_POINT.PORT}/api/${END_POINT.BODYSIZE}/CreateBodySize`
  );
};

export const updateBodySize = () => {
  return axiosClient.get(
    `https://localhost:${END_POINT.PORT}/api/${END_POINT.BODYSIZE}/UpdateBodySize`
  );
};

export const deleteBodySize = () => {
  return axiosClient.get(
    `https://localhost:${END_POINT.PORT}/api/${END_POINT.BODYSIZE}/DeleteBodySize`
  );
};

export const getAllBodySize = (pageNumber, pageSize) => {
  return axiosClient.get(
    `https://localhost:${END_POINT.PORT}/api/${END_POINT.BODYSIZE}/GetAllBodySize?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
};

export const getBodySizeById = () => {
  return axiosClient.get(
    `https://localhost:${END_POINT.PORT}/api/${END_POINT.BODYSIZE}/GetBodySizeById`
  );
};

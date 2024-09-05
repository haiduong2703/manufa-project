import axiosClient from "./axiosClient";

const END_POINT = {
  BODYSIZE: "BodySizeComponent",
};

export const createBodySize = () => {
  return axiosClient.get(
    `https://localhost:44324/api/${END_POINT.BODYSIZE}/CreateBodySize`
  );
};

export const updateBodySize = () => {
  return axiosClient.get(
    `https://localhost:44324/api/${END_POINT.BODYSIZE}/UpdateBodySize`
  );
};

export const deleteBodySize = () => {
  return axiosClient.get(
    `https://localhost:44324/api/${END_POINT.BODYSIZE}/DeleteBodySize`
  );
};

export const getAllBodySize = () => {
  return axiosClient.get(
    `https://localhost:44324/api/${END_POINT.BODYSIZE}/GetAllBodySize`
  );
};

export const getBodySizeById = () => {
  return axiosClient.get(
    `https://localhost:44324/api/${END_POINT.BODYSIZE}/GetBodySizeById`
  );
};

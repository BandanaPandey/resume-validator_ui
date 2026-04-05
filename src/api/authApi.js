import axiosClient from "./axiosClient";

export const signupUser = (data) => {
  return axiosClient.post("/signup", data);
};

export const loginUser = (data) => {
  return axiosClient.post("/login", data);
};
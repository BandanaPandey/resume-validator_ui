import axiosClient from "./axiosClient";

export const signup = (data) => {
  return axiosClient.post("/signup", data);
};

export const login = (data) => {
  return axiosClient.post("/login", data);
};
// src/services/jobApi.js
import axiosClient from "./axiosClient";

export const createJobAndRank = (data) => {
  return axiosClient.post("/jobs", data);
};
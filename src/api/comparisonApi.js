// src/services/comparisonApi.js
import axiosClient from "./axiosClient";

export const compareCandidates = (data) => {
  return axiosClient.post("/compare_candidates", data);
};
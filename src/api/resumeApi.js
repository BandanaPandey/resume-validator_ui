import axiosClient from "./axiosClient"

export const analyzeResume = (data) => {
  return axiosClient.post("/resumes", data)
}
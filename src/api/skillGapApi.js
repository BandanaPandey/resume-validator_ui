import axiosClient from "./axiosClient"

export const analyzeSkillGap = (data) => {
  return axiosClient.post("/skill_gap", data)
}
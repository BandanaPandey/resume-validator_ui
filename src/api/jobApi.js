// src/services/jobApi.js
import axiosClient from "./axiosClient";

export const createJobAndRank = async (data) => {
  const formData = new FormData();

  console.log("Preparing to submit job and candidates:", data);

  // Job description
  console.log("Submitting job description:", data.job_description);
  formData.append("job_description", data.job_description);

  // Candidates
  data.candidates.forEach((c, index) => {
    formData.append(`candidates[${index}][id]`, index);
    formData.append(`candidates[${index}][name]`, c.name);

    if (c.file) {
      // ✅ REAL FILE OBJECT
      formData.append(`candidates[${index}][file]`, c.file);
    }

    if (c.resume) {
      formData.append(`candidates[${index}][resume]`, c.resume);
    }
  });

  // ❗ DO NOT SET CONTENT-TYPE
  return axiosClient.post("/jobs", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
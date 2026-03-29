import axiosClient from "./axiosClient";

/////////////////////////////////////////
// 📄 Single Candidate Report
/////////////////////////////////////////
export const downloadCandidateReport = async (candidate) => {
  const response = await axiosClient.post(
    "/reports/candidate",
    { candidate },
    {
      responseType: "blob" // 🔥 IMPORTANT for PDF
    }
  );

  triggerDownload(response.data, `${candidate.candidate_name || "candidate"}_report.pdf`);
};

/////////////////////////////////////////
// 📄 Top Candidates Report
/////////////////////////////////////////
export const downloadShortlistReport = async (candidates, jobDescription) => {
  const response = await axiosClient.post(
    "/reports/shortlist",
    {
      candidates,
      job_description: jobDescription
    },
    {
      responseType: "blob" // 🔥 IMPORTANT
    }
  );

  triggerDownload(response.data, "top_candidates_report.pdf");
};

/////////////////////////////////////////
// 🔧 Helper: Download File
/////////////////////////////////////////
const triggerDownload = (data, filename) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();

  link.remove();
};
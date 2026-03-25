import React, { useState } from "react";
import JobForm from "../components/ATS/JobForm";
import RankingTable from "../components/ATS/RankingTable";
import { createJobAndRank } from "../api/jobApi";

const JobRankingPage = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);

    try {
      const payload = {
        job_description: data.jobDescription, // ✅ send to backend
        candidates: data.candidates
      };

      const res = await createJobAndRank(payload);

      setResults(res.data.results);
      setJobDescription(data.jobDescription); // ✅ store for comparison later
    } catch (err) {
      console.error("Ranking failed", err);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>ATS Candidate Ranking 🏆</h2>

      <JobForm onSubmit={handleSubmit} />

      {loading && <p>Analyzing candidates...</p>}

      <RankingTable
        data={results}
        jobDescription={jobDescription} // ✅ pass down
      />
    </div>
  );
};

export default JobRankingPage;
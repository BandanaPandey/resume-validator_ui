import React, { useState } from "react";
import JobForm from "../components/ATS/JobForm";
import RankingTable from "../components/ATS/RankingTable";
import { createJobAndRank } from "../api/jobApi";

const JobRankingPage = () => {
  const [results, setResults] = useState([]);

  const handleSubmit = async (data) => {
    const res = await createJobAndRank(data);
    setResults(res.data.results);
  };

  return (
    <div className="container">
      <h1>AI ATS Ranking System 🚀</h1>

      <JobForm onSubmit={handleSubmit} />

      <RankingTable data={results} />
    </div>
  );
};

export default JobRankingPage;
import React, { useState } from "react";
import CandidateSelector from "./CandidateSelector";
import ComparisonTable from "./ComparisonTable";
import AIComparisonSummary from "./AIComparisonSummary";

const CandidateComparison = ({ candidates, jobDescription }) => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (candidate) => {
    const exists = selected.find(
      (c) => c.candidate_id === candidate.candidate_id
    );

    if (exists) {
      setSelected(selected.filter((c) => c.candidate_id !== candidate.candidate_id));
    } else if (selected.length < 3) {
      setSelected([...selected, candidate]);
    }
  };

  return (
    <div className="comparison-card">
      <h3>🔍 Compare Candidates</h3>

      <CandidateSelector
        candidates={candidates}
        selected={selected}
        onSelect={toggleSelect}
      />

      {selected.length >= 2 && (
        <>
          <ComparisonTable candidates={selected} />
          <AIComparisonSummary selected={selected} jobDescription={jobDescription}/>
        </>
      )}
    </div>
  );
};

export default CandidateComparison;
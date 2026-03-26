// src/components/ATS/RankingTable.jsx
import React, { useState } from "react";
import CandidateComparison from "./CandidateComparison";
import CandidateCard from "./CandidateCard";

const RankingTable = ({ data, jobDescription }) => {
  const [selected, setSelected] = useState([]);

  if (!data || data.length === 0) return null;

  const toggleSelect = (candidate) => {
    const exists = selected.find(c => c.candidate_id === candidate.candidate_id);

    if (exists) {
      setSelected(selected.filter(c => c.candidate_id !== candidate.candidate_id));
    } else if (selected.length < 3) {
      setSelected([...selected, candidate]);
    }
  };

  return (
    <div className="ranking-container">
      <h2>🏆 Candidate Rankings</h2>

      <div className="candidate-grid">
        {data.map((candidate) => (
          <CandidateCard
            key={candidate.candidate_id}
            candidate={candidate}
            onSelect={() => toggleSelect(candidate)}
            selected={selected.some(c => c.candidate_id === candidate.candidate_id)}
          />
        ))}
      </div>

      {selected.length >= 2 && (
        <CandidateComparison
          candidates={selected}
          jobDescription={jobDescription}
        />
      )}
    </div>
  );
};

export default RankingTable;
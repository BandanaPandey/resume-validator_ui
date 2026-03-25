// src/components/ATS/RankingTable.jsx
import React, { useState } from "react";
import CandidateModal from "./CandidateModal";
import CandidateComparison from "./CandidateComparison";

const RankingTable = ({ data, jobDescription }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  if (!data || data.length === 0) return null;

  // find highest score for highlight
  const maxScore = Math.max(...data.map((c) => c.score));

  return (
    <div className="card">
      <h3>🏆 Ranked Candidates</h3>

      <table className="ranking-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Candidate</th>
            <th>Score</th>
            <th>Summary</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c) => {
            const isTop = c.score === maxScore;

            return (
              <tr
                key={c.candidate_id}
                className={isTop ? "top-candidate" : ""}
                onClick={() => setSelectedCandidate(c)}
              >
                <td>{c.rank}</td>
                <td>#{c.candidate_id}</td>
                <td>
                  <span className="score-badge">{c.score}</span>
                </td>
                <td>{c.summary}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 🔍 Candidate Details Modal */}
      {selectedCandidate && (
        <CandidateModal
          data={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      {/* 🔥 Candidate Comparison (NEW) */}
      <CandidateComparison candidates={data} jobDescription={jobDescription}/>
    </div>
  );
};

export default RankingTable;
// src/components/ATS/CandidateCard.jsx
import React from "react";

const CandidateCard = ({ candidate, onSelect, selected }) => {
  const {
    candidate_name,
    score,
    rank,
    summary,
    highlights,
    risks,
    recommendation,
    score_breakdown
  } = candidate;

  return (
    <div className={`candidate-card ${selected ? "selected" : ""}`}>
      
      {/* HEADER */}
      <div className="card-header">
        <h3>{candidate_name || `Candidate #${candidate.candidate_id}`}</h3>
        <span className="rank-badge">#{rank}</span>
      </div>

      {/* SCORE */}
      <div className="score-section">
        <div className="score">{score}</div>
        <div className={`recommendation ${recommendation?.toLowerCase().replace(/\s/g, "-")}`}>
          {recommendation}
        </div>
      </div>

      {/* SUMMARY */}
      <p className="summary">{summary}</p>

      {/* HIGHLIGHTS */}
      {highlights?.length > 0 && (
        <div className="section">
          <strong>✅ Strengths</strong>
          <ul>
            {highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* RISKS */}
      {risks?.length > 0 && (
        <div className="section">
          <strong>⚠️ Risks</strong>
          <ul>
            {risks.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SCORE BREAKDOWN */}
      {score_breakdown && (
        <div className="section">
          <strong>📊 Score Breakdown</strong>
          <ul>
            {Object.entries(score_breakdown).map(([k, v]) => (
              <li key={k}>
                {k.replace(/_/g, " ")}: {Math.round(v)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SELECT */}
      <button onClick={onSelect}>
        {selected ? "Deselect" : "Compare"}
      </button>
    </div>
  );
};

export default CandidateCard;
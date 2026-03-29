import React from "react";
import { downloadCandidateReport } from "../../api/reportApi";

const CandidateCard = ({ candidate, onSelect, selected }) => {
  const {
    candidate_id,
    candidate_name,
    score,
    rank,
    summary,
    highlights,
    risks,
    recommendation,
    decision,
    confidence,
    decision_reasons,
    score_breakdown
  } = candidate;

  /////////////////////////////////////////
  // Helpers
  /////////////////////////////////////////
  const decisionClass = decision
    ? decision.toLowerCase().replace(/\s/g, "-")
    : "";

  const recommendationClass = recommendation
    ? recommendation.toLowerCase().replace(/\s/g, "-")
    : "";

  const formatKey = (key) =>
    key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  /////////////////////////////////////////
  // UI
  /////////////////////////////////////////
  return (
    <div className={`candidate-card ${selected ? "selected" : ""}`}>

      {/* 🔹 HEADER */}
      <div className="card-header">
        <h3>{candidate_name || `Candidate #${candidate_id}`}</h3>
        <span className="rank-badge">#{rank}</span>
      </div>

      {/* 🔹 SCORE + DECISION */}
      <div className="score-section">
        <div className="score">{score}</div>

        <div className="badges">
          {decision && (
            <div className={`decision-badge ${decisionClass}`}>
              {decision}
            </div>
          )}

          {recommendation && (
            <div className={`recommendation ${recommendationClass}`}>
              {recommendation}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 CONFIDENCE */}
      {confidence !== undefined && (
        <div className="confidence">
          Confidence: {confidence}%
        </div>
      )}

      {/* 🔹 SUMMARY */}
      {summary && <p className="summary">{summary}</p>}

      {/* 🔹 DECISION REASONS */}
      {decision_reasons?.length > 0 && (
        <div className="section">
          <strong>🧠 Why this decision?</strong>
          <ul>
            {decision_reasons.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔹 STRENGTHS */}
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

      {/* 🔹 RISKS */}
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

      {/* 🔹 SCORE BREAKDOWN */}
      {score_breakdown && (
        <div className="section">
          <strong>📊 Score Breakdown</strong>
          <ul>
            {Object.entries(score_breakdown).map(([key, value]) => (
              <li key={key}>
                {formatKey(key)}: {Math.round(value)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔹 ACTION BUTTONS */}
      <div className="card-actions">

        {/* Compare */}
        <button className="compare-btn" onClick={onSelect}>
          {selected ? "Deselect" : "Compare"}
        </button>

        {/* 🔥 Download PDF */}
        <button
          className="download-btn"
          onClick={() => downloadCandidateReport(candidate)}
        >
          📄 Download Report
        </button>

      </div>
    </div>
  );
};

export default CandidateCard;
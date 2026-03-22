import React from "react";

const ScoreBreakdown = ({ breakdown }) => {
  if (!breakdown) return null;

  return (
    <div className="card">
      <h3>📊 Score Breakdown</h3>

      {Object.entries(breakdown).map(([key, value]) => (
        <div key={key} className="row">
          <span>{key}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default ScoreBreakdown;
import React from "react";

const ScoreCard = ({ result }) => {
  return (
    <div className="card score-card">
      <h2>⭐ Smart Score: {result.smart_score}</h2>

      <p>Match Score: {result.match_score}%</p>
      <p>Weighted Score: {result.weighted_score}%</p>
    </div>
  );
};

export default ScoreCard;
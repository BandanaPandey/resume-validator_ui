import React from "react";

const SkillGapResult = ({ result }) => {
  const {
    match_score = 0,
    matched_skills = [],
    missing_skills = [],
    semantic_matches = [],
    recommendations = [],
  } = result;

  return (
    <div className="result-container">
      {/* Score */}
      <div className="score-card">
        <h2>Match Score</h2>
        <div className="score">{match_score}%</div>
      </div>

      {/* Matched Skills */}
      <div className="section">
        <h3>✅ Matched Skills</h3>
        <ul>
          {matched_skills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Missing Skills */}
      <div className="section">
        <h3>❌ Missing Skills</h3>
        <ul>
          {missing_skills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Semantic Matches */}
      <div className="section">
        <h3>🧠 Semantic Matches</h3>

        <table>
          <thead>
            <tr>
              <th>Job Skill</th>
              <th>Your Skill</th>
              <th>Match %</th>
            </tr>
          </thead>
          <tbody>
            {semantic_matches.map((item, i) => (
              <tr key={i}>
                <td>{item.job_skill}</td>
                <td>{item.resume_skill}</td>
                <td>{Math.round(item.score * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recommendations */}
      <div className="section">
        <h3>💡 Recommendations</h3>
        <ul>
          {recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillGapResult;
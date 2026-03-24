import React from "react";

const ComparisonTable = ({ candidates }) => {
  return (
    <div className="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            {candidates.map((c) => (
              <th key={c.candidate_id}>#{c.candidate_id}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Score */}
          <tr>
            <td>Score</td>
            {candidates.map((c) => (
              <td key={c.candidate_id}>{c.score}</td>
            ))}
          </tr>

          {/* Matched Skills */}
          <tr>
            <td>Matched Skills</td>
            {candidates.map((c) => (
              <td key={c.candidate_id}>
                {c.details.matched_skills?.join(", ")}
              </td>
            ))}
          </tr>

          {/* Missing Skills */}
          <tr>
            <td>Missing Skills</td>
            {candidates.map((c) => (
              <td key={c.candidate_id}>
                {c.details.missing_skills?.join(", ")}
              </td>
            ))}
          </tr>

          {/* Weak Skills */}
          <tr>
            <td>Weak Skills</td>
            {candidates.map((c) => (
              <td key={c.candidate_id}>
                {c.details.weak_matched_skills?.join(", ")}
              </td>
            ))}
          </tr>

          {/* Proficiency */}
          <tr>
            <td>Top Skills</td>
            {candidates.map((c) => (
              <td key={c.candidate_id}>
                {c.details.proficiency
                  ?.slice(0, 5)
                  .map((p) => `${p.skill} (${p.level})`)
                  .join(", ")}
              </td>
            ))}
          </tr>

          {/* Score Breakdown */}
          <tr>
            <td>Breakdown</td>
            {candidates.map((c) => (
              <td key={c.candidate_id}>
                {Object.entries(c.details.score_breakdown || {}).map(
                  ([k, v]) => (
                    <div key={k}>
                      {k}: {v}
                    </div>
                  )
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
import React from "react";

const CandidateSelector = ({ candidates, selected, onSelect }) => {
  return (
    <div>
      <h4>Select up to 3 candidates</h4>

      {candidates.map((c) => {
        const isSelected = selected.find((s) => s.candidate_id === c.candidate_id);

        return (
          <div key={c.candidate_id}>
            <label>
              <input
                type="checkbox"
                checked={!!isSelected}
                onChange={() => onSelect(c)}
              />
              Candidate #{c.candidate_id} (Score: {c.score})
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CandidateSelector;
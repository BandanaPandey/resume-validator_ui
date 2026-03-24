import React from "react";

const CandidateModal = ({ data, onClose }) => {
  const d = data.details;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Candidate #{data.candidate_id}</h2>

        <h3>Score: {data.score}</h3>

        <h4>Matched</h4>
        {d.matched_skills?.map((s, i) => <div key={i}>{s}</div>)}

        <h4>Missing</h4>
        {d.missing_skills?.map((s, i) => <div key={i}>{s}</div>)}

        <h4>Proficiency</h4>
        {d.proficiency?.map((p, i) => (
          <div key={i}>
            {p.skill} - {p.level}
          </div>
        ))}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CandidateModal;
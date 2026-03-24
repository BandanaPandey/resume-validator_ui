import React from "react";

const CandidateInput = ({ data, onChange }) => {
  return (
    <div>
      <input
        placeholder="Name"
        value={data.name}
        onChange={(e) => onChange("name", e.target.value)}
      />

      <textarea
        placeholder="Resume"
        value={data.resume}
        onChange={(e) => onChange("resume", e.target.value)}
      />
    </div>
  );
};

export default CandidateInput;
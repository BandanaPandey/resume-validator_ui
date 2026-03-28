import React from "react";

const CandidateInput = ({ data, onChange }) => {
  return (
    <div className="candidate-input">

      <input
        type="text"
        placeholder="Candidate Name"
        value={data.name}
        onChange={(e) => onChange("name", e.target.value)}
      />

      {/* TEXT AREA (optional fallback) */}
      <textarea
        placeholder="Paste resume (optional)"
        value={data.resume}
        onChange={(e) => onChange("resume", e.target.value)}
      />

      {/* 🔥 PDF Upload */}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => onChange("file", e.target.files[0])}
      />
    </div>
  );
};

export default CandidateInput;
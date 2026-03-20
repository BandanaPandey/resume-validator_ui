import React, { useState } from "react";

const SkillGapForm = ({ onAnalyze }) => {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(resume, jobDesc);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        placeholder="Paste Resume..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        required
      />

      <textarea
        placeholder="Paste Job Description..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        required
      />

      <button type="submit">Analyze</button>
    </form>
  );
};

export default SkillGapForm;
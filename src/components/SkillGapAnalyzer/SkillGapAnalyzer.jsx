import React, { useState } from "react";
import SkillGapForm from "./SkillGapForm";
import SkillGapResult from "./SkillGapResult";
import { analyzeSkillGap } from "../../api/skillGapApi"
import "./SkillGapAnalyzer.css";

const SkillGapAnalyzer = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (resume, jobDesc) => {
    setLoading(true);

    try {
      const response = await analyzeSkillGap({
        resume_text: resume,
        job_description: jobDesc,
      });

      setResult(response.data); // 👈 IMPORTANT
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Skill Gap Analyzer 🚀</h1>

      <SkillGapForm onAnalyze={handleAnalyze} />

      {loading && <p>Analyzing...</p>}

      {result && <SkillGapResult result={result} />}
    </div>
  );
};

export default SkillGapAnalyzer;
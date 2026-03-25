// src/components/ATS/AIComparisonSummary.jsx
import React, { useState } from "react";
import { compareCandidates } from "../../api/comparisonApi";
import ReactMarkdown from "react-markdown";

const AIComparisonSummary = ({ selected, jobDescription  }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);

    try {
      const res = await compareCandidates({
        candidates: selected,
        job_description: jobDescription // ✅ NEW
      });

      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      setSummary("Failed to generate summary");
    }

    setLoading(false);
  };

  return (
    <div className="ai-summary-card">
      <h3>🤖 AI Comparison Summary</h3>

      <button onClick={generateSummary}>
        Generate AI Insight
      </button>

      {loading && <p>Analyzing candidates...</p>}

      {/* 🔥 RENDER MARKDOWN */}
      {summary && (
        <div className="summary-text">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AIComparisonSummary;
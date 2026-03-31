import React, { useState } from "react";
import CandidateComparison from "./CandidateComparison";
import CandidateCard from "./CandidateCard";
import {
  downloadShortlistReport,
  emailShortlistReport
} from "../../api/reportApi";

const RankingTable = ({ data, jobDescription }) => {
  const [selected, setSelected] = useState([]);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  /////////////////////////////////////////
  // Guard
  /////////////////////////////////////////
  if (!data || data.length === 0) return null;

  /////////////////////////////////////////
  // Toggle Select (max 3)
  /////////////////////////////////////////
  const toggleSelect = (candidate) => {
    const exists = selected.find(
      (c) => c.candidate_id === candidate.candidate_id
    );

    if (exists) {
      setSelected(
        selected.filter((c) => c.candidate_id !== candidate.candidate_id)
      );
    } else if (selected.length < 3) {
      setSelected([...selected, candidate]);
    }
  };

  /////////////////////////////////////////
  // 📄 Download Top 10
  /////////////////////////////////////////
  const handleDownload = () => {
    if (!data.length) {
      alert("No candidates available");
      return;
    }

    const topCandidates = data.slice(0, 10);
    downloadShortlistReport(topCandidates, jobDescription);
  };

  /////////////////////////////////////////
  // 📩 Email Top 10
  /////////////////////////////////////////
  const handleEmail = async () => {
    if (!email.trim()) {
      alert("Please enter recruiter email");
      return;
    }

    setSending(true);

    try {
      const topCandidates = data.slice(0, 10);

      await emailShortlistReport(
        email,
        topCandidates,
        jobDescription
      );

      alert("📩 Report emailed successfully!");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  /////////////////////////////////////////
  // UI
  /////////////////////////////////////////
  return (
    <div className="ranking-container">

      {/* 🔥 HEADER */}
      <div className="ranking-header">
        <h2>🏆 Candidate Rankings</h2>

        <button className="download-all-btn" onClick={handleDownload}>
          📄 Download Top 10 Report
        </button>
      </div>

      {/* 📩 EMAIL SECTION */}
      <div className="email-section">
        <input
          type="email"
          placeholder="Enter recruiter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleEmail} disabled={sending}>
          {sending ? "Sending..." : "📩 Email Report"}
        </button>
      </div>

      {/* 🔹 Candidate Grid */}
      <div className="candidate-grid">
        {data.map((candidate) => (
          <CandidateCard
            key={candidate.candidate_id}
            candidate={candidate}
            onSelect={() => toggleSelect(candidate)}
            selected={selected.some(
              (c) => c.candidate_id === candidate.candidate_id
            )}
          />
        ))}
      </div>

      {/* 🔥 Comparison */}
      {selected.length >= 2 && (
        <CandidateComparison
          candidates={selected}
          jobDescription={jobDescription}
        />
      )}
    </div>
  );
};

export default RankingTable;
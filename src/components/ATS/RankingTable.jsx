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
  const [selectAll, setSelectAll] = useState(false);

  /////////////////////////////////////////
  // Guard
  /////////////////////////////////////////
  if (!data || data.length === 0) return null;

  /////////////////////////////////////////
  // 🔹 Top Candidates (limit 10)
  /////////////////////////////////////////
  const topCandidates = data.slice(0, 10);

  /////////////////////////////////////////
  // Toggle Select (manual selection)
  /////////////////////////////////////////
  const toggleSelect = (candidate) => {
    const exists = selected.find(
      (c) => c.candidate_id === candidate.candidate_id
    );

    let updated;

    if (exists) {
      updated = selected.filter(
        (c) => c.candidate_id !== candidate.candidate_id
      );
    } else {
      updated = [...selected, candidate];
    }

    setSelected(updated);

    // 🔥 auto update selectAll checkbox
    setSelectAll(updated.length === topCandidates.length);
  };

  /////////////////////////////////////////
  // 🔥 SELECT ALL TOGGLE
  /////////////////////////////////////////
  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      setSelected(topCandidates); // 🔥 select top 10
      setSelectAll(true);
    }
  };

  /////////////////////////////////////////
  // 📄 Download Top
  /////////////////////////////////////////
  const handleDownloadTop = () => {
    downloadShortlistReport(topCandidates, jobDescription);
  };

  /////////////////////////////////////////
  // 📩 Email Top
  /////////////////////////////////////////
  const handleEmailTop = async () => {
    if (!email.trim()) return alert("Enter recruiter email");

    setSending(true);
    try {
      await emailShortlistReport(email, topCandidates, jobDescription);
      alert("📩 Top candidates emailed!");
      setEmail("");
    } catch {
      alert("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  /////////////////////////////////////////
  // 📄 Download Selected
  /////////////////////////////////////////
  const handleDownloadSelected = () => {
    if (selected.length === 0) {
      return alert("Select at least one candidate");
    }

    downloadShortlistReport(selected, jobDescription);
  };

  /////////////////////////////////////////
  // 📩 Email Selected
  /////////////////////////////////////////
  const handleEmailSelected = async () => {
    if (!email.trim()) return alert("Enter recruiter email");
    if (selected.length === 0) return alert("Select candidates first");

    setSending(true);
    try {
      await emailShortlistReport(email, selected, jobDescription);
      alert(`📩 ${selected.length} candidate(s) emailed!`);
      setEmail("");
    } catch {
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

      {/* HEADER */}
      <div className="ranking-header">
        <h2>🏆 Candidate Rankings</h2>
      </div>

      {/* 🔥 SELECT ALL */}
      <div className="select-all">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <label>Select Top 10</label>
      </div>

      {/* TOP ACTIONS */}
      <div className="actions-row">
        <button onClick={handleDownloadTop}>
          📄 Download Top 10
        </button>

        <button onClick={handleEmailTop} disabled={sending}>
          {sending ? "Sending..." : "📩 Email Top 10"}
        </button>
      </div>

      {/* SELECTED ACTIONS */}
      <div className="actions-row">
        <button onClick={handleDownloadSelected}>
          📄 Download Selected ({selected.length})
        </button>

        <button onClick={handleEmailSelected} disabled={sending}>
          {sending
            ? "Sending..."
            : `📩 Email Selected (${selected.length})`}
        </button>
      </div>

      {/* EMAIL INPUT */}
      <div className="email-section">
        <input
          type="email"
          placeholder="Recruiter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* SELECTED INFO */}
      {selected.length > 0 && (
        <p className="selected-info">
          Selected: {selected.length} candidate(s)
        </p>
      )}

      {/* GRID */}
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

      {/* COMPARISON */}
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
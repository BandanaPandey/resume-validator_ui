import React, { useState } from "react";
import CandidateInput from "./CandidateInput";

const JobForm = ({ onSubmit }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [candidates, setCandidates] = useState([
    { name: "", resume: "", file: null }
  ]);

  /////////////////////////////////////////
  // Add Candidate
  /////////////////////////////////////////
  const addCandidate = () => {
    setCandidates([
      ...candidates,
      { name: "", resume: "", file: null }
    ]);
  };

  /////////////////////////////////////////
  // Remove Candidate
  /////////////////////////////////////////
  const removeCandidate = (index) => {
    const updated = candidates.filter((_, i) => i !== index);
    setCandidates(updated);
  };

  /////////////////////////////////////////
  // Update Candidate
  /////////////////////////////////////////
  const updateCandidate = (i, field, value) => {
    const updated = [...candidates];

    // 🔥 If uploading file → clear resume text
    if (field === "file") {
      updated[i].file = value;
      updated[i].resume = "";
    } else if (field === "resume") {
      updated[i].resume = value;
      updated[i].file = null;
    } else {
      updated[i][field] = value;
    }

    setCandidates(updated);
  };

  /////////////////////////////////////////
  // Validation
  /////////////////////////////////////////
  const isValidCandidate = (c) => {
    return (
      (c.resume && c.resume.trim() !== "") ||
      c.file instanceof File
    );
  };

  /////////////////////////////////////////
  // Submit
  /////////////////////////////////////////
  const submit = () => {
    const validCandidates = candidates.filter(isValidCandidate);

    if (!jobDescription.trim()) {
      alert("Please enter job description");
      return;
    }

    if (validCandidates.length === 0) {
      alert("Please add at least one candidate (resume text or PDF)");
      return;
    }

    onSubmit({
      jobDescription,   // ✅ matches API
      candidates: validCandidates
    });
  };

  /////////////////////////////////////////
  // UI
  /////////////////////////////////////////
  return (
    <div className="card">
      <h3>📄 Job Description</h3>

      <textarea
        placeholder="Paste job description..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <h3>👤 Candidates</h3>

      {candidates.map((c, i) => (
        <div key={i} className="candidate-block">

          <CandidateInput
            data={c}
            onChange={(field, val) =>
              updateCandidate(i, field, val)
            }
          />

          {/* 🔥 Show uploaded file */}
          {c.file && (
            <div className="file-preview">
              📄 {c.file.name}
            </div>
          )}

          <button onClick={() => removeCandidate(i)}>
            Remove
          </button>
        </div>
      ))}

      <button onClick={addCandidate}>
        + Add Candidate
      </button>

      <br />

      <button className="analyze-btn" onClick={submit}>
        🚀 Analyze Candidates
      </button>
    </div>
  );
};

export default JobForm;
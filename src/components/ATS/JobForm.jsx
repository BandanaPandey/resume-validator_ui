import React, { useState } from "react";
import CandidateInput from "./CandidateInput";

const JobForm = ({ onSubmit }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [candidates, setCandidates] = useState([
    { name: "", resume: "" }
  ]);

  /////////////////////////////////////////
  // Add Candidate
  /////////////////////////////////////////
  const addCandidate = () => {
    setCandidates([...candidates, { name: "", resume: "" }]);
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
    updated[i][field] = value;
    setCandidates(updated);
  };

  /////////////////////////////////////////
  // Submit
  /////////////////////////////////////////
  const submit = () => {
    // ✅ Filter empty resumes
    const validCandidates = candidates.filter(
      (c) => c.resume && c.resume.trim() !== ""
    );

    if (!jobDescription.trim()) {
      alert("Please enter job description");
      return;
    }

    if (validCandidates.length === 0) {
      alert("Please add at least one candidate");
      return;
    }

    onSubmit({
      jobDescription,          // ✅ FIXED KEY
      candidates: validCandidates // ✅ structured candidates
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

          <button onClick={() => removeCandidate(i)}>
            Remove
          </button>
        </div>
      ))}

      <button onClick={addCandidate}>+ Add Candidate</button>

      <br />

      <button onClick={submit}>Analyze</button>
    </div>
  );
};

export default JobForm;
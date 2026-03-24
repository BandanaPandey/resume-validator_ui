import React, { useState } from "react";
import CandidateInput from "./CandidateInput";

const JobForm = ({ onSubmit }) => {
  const [job, setJob] = useState("");
  const [candidates, setCandidates] = useState([{ name: "", resume: "" }]);

  const addCandidate = () => {
    setCandidates([...candidates, { name: "", resume: "" }]);
  };

  const updateCandidate = (i, field, value) => {
    const updated = [...candidates];
    updated[i][field] = value;
    setCandidates(updated);
  };

  const submit = () => {
    onSubmit({
      title: "Job",
      description: job,
      candidates
    });
  };

  return (
    <div className="card">
      <h3>Job Description</h3>
      <textarea onChange={(e) => setJob(e.target.value)} />

      <h3>Candidates</h3>
      {candidates.map((c, i) => (
        <CandidateInput
          key={i}
          data={c}
          onChange={(field, val) => updateCandidate(i, field, val)}
        />
      ))}

      <button onClick={addCandidate}>+ Add</button>
      <button onClick={submit}>Analyze</button>
    </div>
  );
};

export default JobForm;
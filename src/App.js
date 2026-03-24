import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import SkillGapAnalyzer from "./components/SkillGapAnalyzer/SkillGapAnalyzer";
import JobRankingPage from "./pages/JobRankingPage";
import "./styles/ats.css";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>AI Resume Platform 🚀</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Skill Gap</Link> |{" "}
          <Link to="/ranking">ATS Ranking</Link>
        </nav>

        <Routes>
          <Route path="/" element={<SkillGapAnalyzer />} />
          <Route path="/ranking" element={<JobRankingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
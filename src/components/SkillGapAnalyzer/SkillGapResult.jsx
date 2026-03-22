import React from "react";
import ScoreCard from "./ScoreCard";
import ScoreBreakdown from "./ScoreBreakdown";
import SkillList from "./SkillList";
import ProficiencyChart from "./ProficiencyChart";
import Recommendations from "./Recommendations";

const SkillGapResult = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result-container">
      <ScoreCard result={result} />

      <ScoreBreakdown breakdown={result.score_breakdown} />

      <SkillList
        matched={result.matched_skills}
        missing={result.missing_skills}
        critical={result.missing_critical_skills}
        weak={result.weak_matched_skills}
      />

      <ProficiencyChart data={result.proficiency} />

      <Recommendations items={result.recommendations} />
    </div>
  );
};

export default SkillGapResult;
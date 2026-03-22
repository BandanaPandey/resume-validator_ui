import React from "react";

const ProficiencyChart = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card">
      <h3>🧠 Skill Proficiency</h3>

      {data.map((skill, i) => (
        <div key={i} className="bar-container">
          <span>{skill.skill}</span>

          <div className="bar">
            <div
              className="fill"
              style={{ width: `${skill.score * 100}%` }}
            ></div>
          </div>

          <span>{skill.level}</span>
        </div>
      ))}
    </div>
  );
};

export default ProficiencyChart;
import React from "react";

const SkillList = ({ matched, missing, critical, weak }) => {
  return (
    <div className="card">
      <h3>🧩 Skills</h3>

      <div>
        <h4>✅ Matched</h4>
        {matched?.map((s, i) => <span key={i} className="tag success">{s}</span>)}
      </div>

      <div>
        <h4>❌ Missing</h4>
        {missing?.map((s, i) => <span key={i} className="tag danger">{s}</span>)}
      </div>

      <div>
        <h4>🚨 Critical Missing</h4>
        {critical?.map((s, i) => <span key={i} className="tag critical">{s}</span>)}
      </div>

      <div>
        <h4>⚠️ Weak Skills</h4>
        {weak?.map((s, i) => <span key={i} className="tag warning">{s}</span>)}
      </div>
    </div>
  );
};

export default SkillList;
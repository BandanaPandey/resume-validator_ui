import React from "react";

const Recommendations = ({ items }) => {
  if (!items) return null;

  return (
    <div className="card">
      <h3>💡 Recommendations</h3>

      <ul>
        {items.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
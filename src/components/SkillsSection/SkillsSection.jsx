import "./SkillsSection.css"

function SkillsSection({ skills }) {
  if (!skills) return null

  return (
    <div className="card">
      <h3>Extracted Skills</h3>

      {Object.entries(skills).map(([category, list]) => (
        <div key={category}>
          <b>{category}</b>

          <div className="skills-container">
            {list.map((skill, i) => (
              <span key={i} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkillsSection
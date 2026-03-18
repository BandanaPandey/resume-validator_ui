import ScoreCard from "../ScoreCard"
import SkillsSection from "../SkillsSection"

function ResumeResult({ result }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <ScoreCard score={result.score} />

      <div className="card">
        <h3>Section Scores</h3>
        <ul>
          {Object.entries(result.section_scores || {}).map(([k, v]) => (
            <li key={k}>{k}: {v}</li>
          ))}
        </ul>
      </div>

      <SkillsSection skills={result.extracted_skills} />

      <div className="card">
        <h3>Strengths</h3>
        <ul>
          {result.strengths?.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <div className="card">
        <h3>Weaknesses</h3>
        <ul>
          {result.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
        </ul>
      </div>

      <div className="card">
        <h3>Improvements</h3>
        <ul>
          {result.improvements?.map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      </div>

      <div className="card">
        <h3>Rewritten Bullets</h3>
        {result.rewritten_bullets?.map((b, i) => (
          <div key={i}>
            <b>Before:</b> {b.original} <br />
            <b>After:</b> {b.improved}
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResumeResult
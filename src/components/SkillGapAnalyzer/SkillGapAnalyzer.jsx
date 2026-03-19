import { useState } from "react"
import { analyzeSkillGap } from "../../api/skillGapApi"

function SkillGapAnalyzer() {
  const [resume, setResume] = useState("")
  const [job, setJob] = useState("")
  const [result, setResult] = useState(null)

  const handleAnalyze = async () => {
    const res = await analyzeSkillGap({
      resume,
      job_description: job
    })
    setResult(res.data)
  }

  return (
    <div className="card">
      <h2>Skill Gap Analyzer</h2>

      <textarea
        placeholder="Paste Resume"
        onChange={(e) => setResume(e.target.value)}
      />

      <textarea
        placeholder="Paste Job Description"
        onChange={(e) => setJob(e.target.value)}
      />

      <button onClick={handleAnalyze}>
        Analyze Gap
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Match Score: {result.match_score}%</h3>

          <h4>Matched Skills</h4>
          <ul>
            {result.matched_skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>

          <h4>Missing Skills</h4>
          <ul>
            {result.missing_skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>

          <h4>Extra Skills</h4>
          <ul>
            {result.extra_skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>

          <h4>Recommendations</h4>
          <ul>
            {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SkillGapAnalyzer
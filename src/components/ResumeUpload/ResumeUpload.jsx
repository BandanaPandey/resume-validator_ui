import { useState } from "react"
import { analyzeResume } from "../../api/resumeApi"

function ResumeUpload() {
  const [content, setContent] = useState("")
  const [result, setResult] = useState(null)

  const handleAnalyze = async () => {
    const res = await analyzeResume({ content })
    setResult(res.data)
  }

  return (
    <div>
      <textarea
        placeholder="Paste your resume"
        onChange={(e)=>setContent(e.target.value)}
      />

      <button onClick={handleAnalyze}>
        Analyze Resume
      </button>

      {result && <div>Score: {result.score}</div>}
    </div>
  )
}

export default ResumeUpload
import { useState } from "react"
import { analyzeResume } from "../../api/resumeApi"
import ResumeResult from "../ResumeResult"
import "./ResumeUpload.css"

function ResumeUpload() {
  const [content, setContent] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const res = await analyzeResume({ content })
      setResult(res.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className="card upload-box">
      <textarea
        rows="10"
        placeholder="Paste your resume..."
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <button onClick={handleAnalyze}>
        Analyze Resume
      </button>

      {loading && <p>Analyzing...</p>}

      {result && <ResumeResult result={result} />}
    </div>
  )
}

export default ResumeUpload
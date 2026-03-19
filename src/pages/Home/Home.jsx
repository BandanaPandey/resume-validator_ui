import ResumeUpload from "../../components/ResumeUpload/ResumeUpload"
import SkillGapAnalyzer from "../../components/SkillGapAnalyzer/SkillGapAnalyzer"

function Home() {
  return (
    <div>
      <h1>AI Resume Toolkit</h1>

      <ResumeUpload />
      <SkillGapAnalyzer />
    </div>
  )
}

export default Home
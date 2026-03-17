import ResumeUpload from "../../components/ResumeUpload/ResumeUpload"

function Home() {
  return (
    <div style={{padding:"40px"}}>
      <h1>AI Resume Validator</h1>
      <p>Paste your resume below to analyze it.</p>

      <ResumeUpload />
    </div>
  )
}

export default Home
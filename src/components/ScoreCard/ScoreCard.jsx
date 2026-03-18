import "./ScoreCard.css"

function ScoreCard({ score }) {
  return (
    <div className="card score-card">
      <h2>Resume Score</h2>
      <div className="score-value">{score}/100</div>
    </div>
  )
}

export default ScoreCard
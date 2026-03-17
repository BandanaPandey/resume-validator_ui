 import { useState } from "react"
import { analyzeResume } from "../api/resumeApi"

export default function useResume(){
  const [result,setResult] = useState(null)

  const analyze = async(content)=>{
    const res = await analyzeResume({content})
    setResult(res.data)
  }

  return {result, analyze}
}
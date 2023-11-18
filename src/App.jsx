import { useState } from "react"
import { PixelCopy } from "./games/PixelCopy"



function App() {
  const [playerScore, setPlayerScore] = useState(0);

  return (
    <div className="container" >
      <h1>Score: {playerScore}</h1>
      <PixelCopy setPlayerScore={setPlayerScore}/>
    </div>
  )
}

export default App

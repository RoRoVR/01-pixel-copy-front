import { useState } from "react"
import { PixelCopy } from "./games/PixelCopy"
import { Time } from "./components/Time";
import { StartGame } from "./components/StartGame";
import { FinishGame } from "./components/FinishGame";



function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [finishGame, setFinishGame] = useState(false);

  return (
    <div className="container" >
      { !startGame&& <StartGame setStartGame={setStartGame} setFinishGame={setFinishGame} />}
      { finishGame&& <FinishGame playerScore={playerScore} />}

      <h1 style={{fontSize: '60px'}} >Score: {playerScore}</h1>
      <Time startGame={startGame} />
      <PixelCopy setPlayerScore={setPlayerScore}/>
    </div>
  )
}

export default App

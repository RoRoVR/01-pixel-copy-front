import soundGame from '../assets/sound-game.mp3';


export const StartGame = ({setStartGame, setFinishGame}) => {

  const startGame = () => {
    const sound = new Audio(soundGame);
    sound.volume = 0.5;
    sound.play();
    setStartGame(s=>!s);
    setTimeout(() => {
      setFinishGame(true);      
    }, 60000);
  }


  return (
    <div className='container-block'>
      <button className="btn-play" onClick={startGame} ></button>
        <h1>START GAME</h1>
    </div>
  )
}

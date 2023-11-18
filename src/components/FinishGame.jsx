
export const FinishGame = ({playerScore}) => {
  return (
    <div className='container-block' >
        <h1 style={{fontSize:'50px', color:'green'}} >SCORE</h1>
        <p style={{fontSize:'200px', color:'green'}} >{playerScore}</p>
        <h2 style={{fontSize:'30px'}} >GAME OVER</h2>
    </div>
  )
}

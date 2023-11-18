
export const Time = ({startGame}) => {
  return (
    <div className='container-time'>
      <div className={`time ${startGame&&'start'}`}></div>
    </div>
  )
}

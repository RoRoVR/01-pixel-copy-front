import axios from "axios";
import { useEffect, useState } from "react";

const Pixel = ({value, r, c, pixels, setPixels, block=false}) => {


  const handleClick = (e) => {
    if(e.buttons === 1){
      const newPixels = pixels;
      newPixels[r][c] = (newPixels[r][c] === 1)?0:1;
      setPixels([...newPixels]);
    }
  }
  return(
    <button 
      className= {`pixel ${(value===0)?'pixel-btn-1':'pixel-btn-2'}`}
      onMouseEnter={handleClick}
      onMouseDown={handleClick}
      disabled={block}
    ></button>
  )
}

export const PixelCopy = () => {

  const [pixels, setPixels] = useState([
                                        [0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0]
                                      ]);
  const [copyPixel, setcopyPixel] = useState(pixels);
  const [score, setScore] = useState(0)

  
  const savePixelArt = async() => {
    let score = 0;

    for (let i = 0; i < pixels.length; i++) {
      pixels[i].forEach(p => {
        if(p===1) score++;
      })
    }

    try {
      const url = 'http://localhost:8080/api/pixelcopy';
      const data = {pixels: JSON.stringify(pixels), score};

      const response = await axios.post(url, data);
      
      console.log(response)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/pixelcopy/random')
      .then(respose=>{
        const {data} = respose;
        setcopyPixel(JSON.parse(data.pixelart.pixels));
        setScore(data.pixelart.score);
      })
      .catch(error=>console.log(error))
  }, [])
  


  return (
    <div className='game-container-px' >

      <div style={{display:'inline-block' }} >
        {pixels.map((row,r)=>(
          <div key={r}>
            {
              row.map((value,c) => (
                <Pixel key={c} value={value} r={r} c={c} pixels={pixels} setPixels={setPixels} />
              ))
            }
          </div>
        ))}
      </div>

      <button className="btn-next" onClick={savePixelArt}></button>


      <div style={{display:'inline-block' }} >
        {copyPixel.map((row,r)=>(
          <div key={r}>
            {
              row.map((value,c) => (
                <Pixel key={c} value={value} r={r} c={c} pixels={pixels} setPixels={setPixels} block />
              ))
            }
          </div>
        ))}
      </div>

    </div>
  )
}

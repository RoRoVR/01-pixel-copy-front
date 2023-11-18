import axios from "axios";
import { useEffect, useState } from "react";
import audioNext from '../assets/sound-next.mp3';

const Pixel = ({value, r, c, pixels, setPixels, block=false, pixelArtsEquals, pixelsEquals=false}) => {
  const handleClick = (e) => {
    if(e.buttons === 1){
      const newPixels = pixels;
      newPixels[r][c] = (newPixels[r][c] === 1)?0:1;
      setPixels([...newPixels]);
      pixelArtsEquals()
    }
  }
  return(
    <button 
      className= {`pixel ${(value===0)?'pixel-btn-1':'pixel-btn-2'} ${pixelsEquals&&'equals'}`}
      onMouseEnter={handleClick}
      onMouseDown={handleClick}
      disabled={block || pixelsEquals}
    ></button>
  )
}

export const PixelCopy = ({setPlayerScore}) => {

  const [pixelsEquals, setPixelsEquals] = useState(false);
  const initialStatePixels = [
                              [0,0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0,0]
                            ]
  const [pixels, setPixels] = useState([...initialStatePixels]);
  const [copyPixel, setcopyPixel] = useState([...initialStatePixels]);
  const [score, setScore] = useState(0);
    
  const savePixelArt = async() => {
    // let score = 0;

    // for (let i = 0; i < pixels.length; i++) {
    //   pixels[i].forEach(p => {
    //     if(p===1) score++;
    //   })
    // }

    // try {
    //   const url = 'http://localhost:8080/api/pixelcopy';
    //   const data = {pixels: JSON.stringify(pixels), score};

    //   const response = await axios.post(url, data);
      
    //   console.log(response)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const pixelArtsEquals = () => {
    const isEqueals = JSON.stringify(pixels) === JSON.stringify(copyPixel);
    if(isEqueals) {
      const next = new Audio(`${audioNext}`);
      next.play();
      setPixelsEquals(true);
      setPlayerScore(s=>s+score);

      setTimeout(() => { // Reset pixels
        setPixelsEquals(false);
        setPixels(initialStatePixels);
        newPixelArt();
      }, 1000);
    }
  }

  const newPixelArt = () => {
    axios.get('http://localhost:8080/api/pixelcopy/random')
      .then(respose=>{
        const {data} = respose;
        setcopyPixel(JSON.parse(data.pixelart.pixels));
        setScore(data.pixelart.score);
      })
      .catch(error=>console.log(error))
  }

  useEffect(() => {
    newPixelArt();
  }, [])
  


  return (
    <div className='game-container-px' >
      <div style={{display:'inline-block' }} >
        {pixels.map((row,r)=>(
          <div key={r}>
            {
              row.map((value,c) => (
                <Pixel key={c} value={value} r={r} c={c} pixels={pixels} setPixels={setPixels} pixelArtsEquals={pixelArtsEquals} pixelsEquals={pixelsEquals} />
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
                <Pixel key={c} value={value} r={r} c={c} pixels={pixels} setPixels={setPixels} block pixelsEquals={pixelsEquals} />
              ))
            }
          </div>
        ))}
      </div>

    </div>
  )
}

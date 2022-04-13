import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

const URL = "http://j0.wlmediahub.com/App_Themes/api/test/photos.js";

function App() {

  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImages, setcurrentImages] = useState([]);
  const [focus, setFocus] = useState(false);

  useMemo(async () => {
    const requestInit: RequestInit = {};
    requestInit.method = "GET";
    const response = await fetch(URL, requestInit);
    response.json().then((value) => {
      setImages(value.photo);
    })
  }, []);

  useEffect(() => {
    shuffleArray();
  }, [images]);

  function shuffleArray() {
    const arr: any = [];
    for (let index = 0; index < 6; index++) {
      const element = images[getRandomNumber(0, images.length - 1)];
      arr.push(element);
    }
    setcurrentImages(arr);
  }

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function clickLabel(value: any) {
    value.preventDefault();
    setCurrentIndex(value.target.text)
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <div>
          <div>
            {(focus && currentImages[currentIndex]) && (currentImages[currentIndex] as any).title}
          </div>
          <div onMouseOver={() =>setFocus(true)} onMouseOut={() =>setFocus(false)}>
            {currentImages[currentIndex] && <img src={(currentImages[currentIndex] as any).img} />}
          </div>
          <div>
            {(focus && currentImages[currentIndex]) && (currentImages[currentIndex] as any).description}
          </div>
          <button onClick={shuffleArray}>load</button>
          <div>
            <span><a href='' onClick={clickLabel}>1</a></span>
            <span><a href='' onClick={clickLabel}>2</a></span>
            <span><a href='' onClick={clickLabel}>3</a></span>
            <span><a href='' onClick={clickLabel}>4</a></span>
            <span><a href='' onClick={clickLabel}>5</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useRef } from 'react'
import './ImageScroll.css'

function ImageScroll() {

    // const canvas = document.querySelector('.image-blend-canvas')
    
    const canvas = useRef()


    
    
    window.addEventListener("scroll", () => {
        
        playAnimation()
    })

    useEffect(() => {
        console.log(canvas.current.width);
      }, []);

    const playAnimation = () => {


        const widthRatio = window.innerWidth / canvas.width;
        const heightRatio = window.innerHeight / canvas.height;
        let canvasScaleRatio = 0;
        if( widthRatio <= heightRatio ) {
            // 캔버스 보다 브라우저 창이 홀쭉한 경우
            canvasScaleRatio = heightRatio;
        } else {
            // 캔버스보다 브라우저창이 납작한 경우
            canvasScaleRatio = widthRatio;
        }
        canvas.current.transform = `scale(${canvasScaleRatio})`
        

    }

  return (
    <div>
        <canvas ref={canvas} className="image-blend-canvas" width="1920" height="1080"></canvas>
    </div>
  )
}

export default ImageScroll
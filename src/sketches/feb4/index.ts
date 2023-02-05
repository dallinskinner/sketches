import '../../styles.css'
import './styles.css'
import p5 from 'p5'
import { ouputToAscii } from '../../util/ascii'

new p5((p5: p5) => {
  let canvas: HTMLCanvasElement
  let bufferCanvas: HTMLCanvasElement
  let bufferContext: CanvasRenderingContext2D

  p5.setup = () => {
    p5.createCanvas(100, 100, p5.WEBGL)
    p5.noStroke()

    const canvasQuery = document.querySelector('canvas')
    if (canvasQuery) {
      canvas = canvasQuery
    }

    bufferCanvas = document.createElement('canvas')
    bufferCanvas.height = 100
    bufferCanvas.width = 100

    const contextQuery = bufferCanvas.getContext('2d', { willReadFrequently: true })
    if (contextQuery) {
      bufferContext = contextQuery
    }
  }

  p5.draw = () => {
    p5.background(0)
    p5.directionalLight(255, 255, 255, 0, 0, -0.5)

    p5.scale(1.2)

    p5.push()
    p5.rotateX(p5.frameCount * 0.03)
    p5.rotateY(p5.frameCount * 0.01)
    p5.rotateZ(p5.frameCount * 0.02)

    p5.push()
    p5.rotateZ(p5.frameCount * 0.02)
    p5.push()
    p5.translate(0, 30, 0)
    p5.sphere(5)
    p5.pop()
    p5.translate(0, -30, 0)
    p5.sphere(5)
    p5.pop()

    p5.cylinder(5, 40, 10, 10)
    p5.pop()

    p5.push()
    p5.rotateX(p5.frameCount * -0.03)
    p5.rotateY(p5.frameCount * -0.01)
    p5.rotateZ(p5.frameCount * -0.02)

    p5.push()
    p5.rotateZ(p5.frameCount * -0.02)
    p5.push()
    p5.translate(0, 30, 0)
    p5.sphere(5)
    p5.pop()
    p5.translate(0, -30, 0)
    p5.sphere(5)
    p5.pop()

    p5.cylinder(5, 40, 10, 10)
    p5.pop()

    if (p5.frameCount % 2 === 0) {
      const image = new Image()
      image.src = canvas.toDataURL()

      image.onload = () => bufferContext.drawImage(image, 0, 0)
    }

    ouputToAscii(true, bufferContext)
  }
})

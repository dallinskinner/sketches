import './styles.css'
import p5 from 'p5'

new p5((p5: p5) => {
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight)
  }

  p5.draw = () => {
    p5.background(0)
  }
})

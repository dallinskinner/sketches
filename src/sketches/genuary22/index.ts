import '../../styles.css'
import './styles.css'
import p5 from 'p5'
import { ouputToAscii } from '../../util/ascii'
import { Point } from '../../class/Point'

new p5((p5: p5) => {
  const points: Point[] = []
  const totalPoints = 5
  const mutationInterval = 5 // seconds
  const frameRate = 60
  const strokeWeight = 3

  // functions
  function drawLines(points: Point[]) {
    points.forEach((originPoint) => {
      points.forEach((endPoint) => {
        if (originPoint === endPoint) {
          return
        }
        p5.stroke(255)
        p5.strokeWeight(strokeWeight)
        p5.line(originPoint.x1, originPoint.y1, endPoint.x1, endPoint.y1)
      })
    })
  }

  // lifecycle
  p5.setup = () => {
    // sketch.createCanvas(window.innerWidth, window.innerHeight);
    p5.createCanvas(100, 100)
    // sketch.noLoop();
    p5.frameRate(frameRate)

    for (let i = 0; i < totalPoints; i++) {
      points.push(new Point(p5.width, p5.height))
      points[i].startMoving()
    }
  }

  p5.draw = () => {
    if (p5.frameCount >= frameRate * mutationInterval) {
      p5.frameCount = 0
      points.forEach((point) => point.startMoving())
    }

    p5.background(0)
    points.forEach((point) => point.draw(p5))
    drawLines(points)
    ouputToAscii(true)
  }
})

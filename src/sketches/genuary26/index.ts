import '../../styles.css'
import p5 from 'p5'
import { colorPalettes } from '../../util/colorPalettes'
import { ColorPalette } from '../../class/ColorPalette'

type Point = { x: number; y: number; color: string }

new p5((sketch: p5) => {
  const frameRate = 60
  const directionInterval = 0.2 * frameRate
  const colorInterval = 5 * frameRate
  let points: Point[] = []
  let currentDestination: Point
  const currentStep: {
    x: number
    y: number
  } = { x: 0, y: 0 }

  const fullColorPalette = colorPalettes.mist
  const [initialBackgroundColor, ...remainingColors] = fullColorPalette.colors
  let backgroundColor = initialBackgroundColor
  let colorPalette = new ColorPalette(remainingColors)

  function getRandomPoint(p5: p5): Point {
    return {
      x: p5.random(0, p5.width),
      y: p5.random(0, p5.height),
      color: colorPalette.next(),
    }
  }

  function drawLine(p5: p5) {
    for (let i = 0; i < points.length; i++) {
      const firstPoint = points[i]
      const secondPoint = points[i + 1]

      if (firstPoint && secondPoint) {
        const { x: x1, y: y1, color } = firstPoint
        const { x: x2, y: y2 } = secondPoint

        p5.stroke(color)
        p5.line(x1, y1, x2, y2)
      }
    }
  }

  function updateCurrentPoint() {
    const lastIndex = points.length - 1
    points[lastIndex].x += currentStep.x
    points[lastIndex].y += currentStep.y
  }

  function calculateNextStep() {
    const { x: lastX, y: lastY } = points[points.length - 1]
    const { x: newX, y: newY } = currentDestination
    currentStep.x = (newX - lastX) / directionInterval
    currentStep.y = (newY - lastY) / directionInterval
  }

  function shiftColor() {
    const oldColor = backgroundColor
    const newColor = colorPalette.next()

    colorPalette = new ColorPalette(fullColorPalette.colors.filter((color) => color !== newColor))
    backgroundColor = newColor
    points.forEach((point) => {
      if (point.color === newColor) {
        point.color = oldColor
      }
    })
  }

  sketch.setup = () => {
    sketch.frameRate(frameRate)
    sketch.createCanvas(window.innerWidth, window.innerHeight)
    sketch.stroke(colorPalette.next())
    sketch.strokeWeight(50)
    sketch.strokeCap(sketch.ROUND)

    points.push(getRandomPoint(sketch))
    currentDestination = getRandomPoint(sketch)
    calculateNextStep()
  }

  sketch.draw = () => {
    sketch.background(backgroundColor)

    if (sketch.frameCount % directionInterval === 0) {
      points.push(currentDestination)
      currentDestination = getRandomPoint(sketch)
      calculateNextStep()
    }

    if (sketch.frameCount % colorInterval === 0) {
      shiftColor()
      points = [getRandomPoint(sketch)]
      currentDestination = getRandomPoint(sketch)
      calculateNextStep()
    }

    updateCurrentPoint()
    drawLine(sketch)
  }
})

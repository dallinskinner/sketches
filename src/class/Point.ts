import p5 from 'p5'

export class Point {
  static size = 1
  static mutationSpeed = 1

  canvasWidth: number
  canvasHeight: number
  x1: number
  y1: number
  x2: number
  y2: number

  constructor(width: number, height: number) {
    this.canvasWidth = width
    this.canvasHeight = height

    this.x1 = Math.floor(Math.random() * width)
    this.y1 = Math.floor(Math.random() * height)

    this.x2 = this.x1
    this.y2 = this.y1
  }

  startMoving() {
    this.x2 = Math.floor(Math.random() * this.canvasWidth)
    this.y2 = Math.floor(Math.random() * this.canvasHeight)
  }

  draw(sketch: p5) {
    if (this.x1 !== this.x2) {
      this.x1 += this.x1 > this.x2 ? -1 * Point.mutationSpeed : 1 * Point.mutationSpeed
    }

    if (this.y1 !== this.y2) {
      this.y1 += this.y1 > this.y2 ? -1 * Point.mutationSpeed : 1 * Point.mutationSpeed
    }

    sketch.ellipse(this.x1, this.y1, Point.size, Point.size)
  }
}

export class ColorPalette {
  colors: string[]
  currentIndex: number

  constructor(colors: string[]) {
    this.colors = colors
    this.currentIndex = 0
  }

  next() {
    if (this.colors.length === this.currentIndex) {
      this.currentIndex = 0
    }

    return this.colors[this.currentIndex++]
  }

  random() {
    return this.colors[Math.floor(this.colors.length * Math.random())]
  }
}

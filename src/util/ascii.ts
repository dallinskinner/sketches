let context: CanvasRenderingContext2D
let canvas: HTMLCanvasElement
const asciiElement = document.querySelector('#ascii')

const grayRamp = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. '

// the grayScale value is an integer ranging from 0 (black) to 255 (white)
function getCharacterForGrayScale(grayScale: number) {
  return grayRamp[Math.ceil(((grayRamp.length - 1) * grayScale) / 255)]
}

function toGrayScale(r: number, g: number, b: number) {
  return 0.21 * r + 0.72 * g + 0.07 * b
}

function convertToGrayScales(context: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = context.getImageData(0, 0, width, height)

  const grayScales: number[] = []

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i]
    const g = imageData.data[i + 1]
    const b = imageData.data[i + 2]

    const grayScale = toGrayScale(r, g, b)

    grayScales.push(grayScale)
  }

  return grayScales
}

function drawAscii(grayScales: number[], width: number) {
  const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
    let nextChars = getCharacterForGrayScale(grayScale)

    if ((index + 1) % width === 0) {
      nextChars += '\n'
    }

    return asciiImage + nextChars
  }, '')

  return ascii
}

export function ouputToAscii() {
  if (!asciiElement) throw new Error('no ascii element')

  if (!context) {
    const canvasQueryResult = document.querySelector('canvas')
    if (!canvasQueryResult) throw new Error('No canvas found')

    canvas = canvasQueryResult
    const contextResult = canvas.getContext('2d')

    if (!contextResult) throw new Error('Could not get context')
    context = contextResult
  }

  const grayScales = convertToGrayScales(context, canvas.width, canvas.height)

  const asciiString = drawAscii(grayScales, canvas.width)
  asciiElement.textContent = asciiString
}

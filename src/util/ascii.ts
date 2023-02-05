import { courier } from './charSets'

let context: CanvasRenderingContext2D
let canvas: HTMLCanvasElement
let asciiElement: HTMLPreElement

const charSet = courier
const grayRamp = charSet.ramp
const inverseGrayRamp = grayRamp.split('').reverse().join('')

function init(passedContext?: CanvasRenderingContext2D) {
  if (passedContext) {
    context = passedContext
    canvas = passedContext.canvas
  } else {
    const canvasQueryResult = document.querySelector('canvas')
    if (!canvasQueryResult) throw new Error('No canvas found')
    canvas = canvasQueryResult

    const contextResult = canvas.getContext('2d', { willReadFrequently: true })
    if (!contextResult) throw new Error('Could not get context')
    context = contextResult
  }

  const asciiResult = document.querySelector('#ascii')
  if (!asciiResult) throw new Error('Could not get <pre> element')
  asciiElement = asciiResult as HTMLPreElement

  asciiElement.style.fontFamily = charSet.font
  asciiElement.style.lineHeight = `${charSet.lineHeight}`
  asciiElement.style.letterSpacing = `${charSet.letterSpacing}`
}

// the grayScale value is an integer ranging from 0 (black) to 255 (white)
function getCharacterForGrayScale(grayScale: number, inverse: boolean) {
  let ramp: string
  if (inverse) {
    ramp = inverseGrayRamp
  } else {
    ramp = grayRamp
  }

  return ramp[Math.ceil(((ramp.length - 1) * grayScale) / 255)]
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

function drawAscii(grayScales: number[], width: number, inverse: boolean) {
  const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
    let nextChars = getCharacterForGrayScale(grayScale, inverse)

    if ((index + 1) % width === 0) {
      nextChars += '\n'
    }

    return asciiImage + nextChars
  }, '')

  return ascii
}

export function ouputToAscii(inverse = false, passedContext?: CanvasRenderingContext2D) {
  if (!context) {
    init(passedContext)
  }

  if (!asciiElement) throw new Error('no ascii element')

  const grayScales = convertToGrayScales(context, canvas.width, canvas.height)

  const asciiString = drawAscii(grayScales, canvas.width, inverse)
  asciiElement.textContent = asciiString
}

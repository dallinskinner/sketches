export interface CharSet {
  font: string
  lineHeight: number
  letterSpacing: number
  ramp: string
}

const ramps = {
  boring: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ',
  smiles: '▓▓▓■▒☻░●☺◌ ',
  faceCards: '╳♠♥♦♣•▒○ ',
}

export const courier: CharSet = {
  font: 'Courier New',
  lineHeight: 1,
  letterSpacing: 4.82,
  ramp: ramps.smiles,
}

export const standard: CharSet = {
  font: 'Courier New',
  lineHeight: 1,
  letterSpacing: 4.82,
  ramp: ramps.boring,
}

// export const courier = {
//   font: 'Courier New',
//   lineHeight: 1,
//   letterSpacing: 4.82,
//   ramp: '▓▓▓■▒☻░●☺◌ ',
// }

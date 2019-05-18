
export const light = '⚪'
export const dark = '⚫'

export function fromNumber (value) {
  if (value > 0) return light
  if (value < 0) return dark
  return ''
}

export default {
  light: 1,
  empty: 0,
  dark: -1,
  hint: 0.5,
  fromNumber
}

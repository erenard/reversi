export const light = '⚪'
export const dark = '⚫'

export const DiskConstants = {
  light: 1,
  empty: 0,
  dark: -1,
  hint: 0.5
}

class Disk {
  constructor (value = 0) {
    this.value = value
  }

  get char () {
    if (this.value > 0) return light
    if (this.value < 0) return dark
    return ''
  }
}

export default Disk

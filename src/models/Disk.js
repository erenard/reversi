
const Disk = {
  White: '⚪',
  Black: '⚫',
  fromNumber(value) {
    if (value > 0) return this.White
    if (value < 0) return this.Black
    return ''
  }
}

export default Disk

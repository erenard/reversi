import Direction from './Direction'
import Disk from './Disk'

/**
 * The reversi board
 *
 * @class      Reversi handle the game board and next player turn.
 */
class Reversi {
  /**
   * Creates a reversi board
   *
   * @param      {Number}  [height=8]  The height
   * @param      {Number}  [width=8]   The width
   */
  constructor (height = 8, width = 8) {
    this.height = height > 4 ? height : 4
    this.width = width > 4 ? width : 4
    this.board = Array.from(new Array(this.height), row => new Array(this.width))
    this.nextTurnPlayer = Disk.empty
    this.reset()
  }

  /**
   * Generate all the existing positions for the board
   *
   * @return     {Array}     A position of the form: [rowIndex, columnIndex]
   */
  * positions () {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        yield [row, col]
      }
    }
  }

  /**
   * Gets the board value at a given position.
   *
   * @param      {Array}    position  The position of the form: [rowIndex, columnIndex]
   * @return     {Number}             The value
   */
  getValueAt (position) {
    return this.board[position[0]][position[1]]
  }

  /**
   * Sets the board value at a given position.
   *
   * @param      {Array}    position  The position of the form: [rowIndex, columnIndex]
   * @param      {Number}   value     The value
   */
  setValueAt (position, value) {
    this.board[position[0]][position[1]] = value
  }

  /**
   * Reset the board and the next player's turn
   */
  reset () {
    this.board.forEach(row => row.fill(0))
    const halfHeight = (this.height - 1) / 2
    const halfWidth = (this.width - 1) / 2
    this.board[Math.floor(halfHeight)][Math.floor(halfWidth)] = Disk.light
    this.board[Math.floor(halfHeight)][Math.ceil(halfWidth)] = Disk.dark
    this.board[Math.ceil(halfHeight)][Math.floor(halfWidth)] = Disk.dark
    this.board[Math.ceil(halfHeight)][Math.ceil(halfWidth)] = Disk.light
    this.nextTurnPlayer = Disk.dark
  }

  /**
   * Removes all hints from the board
   */
  clearHints () {
    for (let position of this.positions()) {
      const value = this.getValueAt(position)
      this.setValueAt(position, Math.sign(value) * Math.floor(Math.abs(value)))
    }
  }

  /**
   * Yield every position available in a direction
   *
   * @param      {Array}  position   The starting position, will NOT be yielded
   * @param      {Array}  direction  The direction
   * @return     {Array}  Every position until the edge of the board.
   */
  * walkFromPositionInDirection (position, direction) {
    while (true) {
      position = position.map((element, index) => element + direction[index])
      if (position[0] >= 0 && position[1] >= 0 && position[0] < this.height && position[1] < this.width) {
        yield position
      } else {
        break
      }
    }
  }

  /**
   * Determines if play is possible in direction.
   * Return an array of disks to be flipped by the play.
   *
   * @param      {Array}   position   The position
   * @param      {Array}   direction  The direction
   * @return     {Array}   An array of the opponent disks to be flipped by the play.
   */
  disksToFlipFromPositionInDirection (position, direction) {
    let foundOpponentDisk = false
    let opponentDisk = this.nextTurnPlayer * -1
    const flippedDisks = []
    for (let walkPosition of this.walkFromPositionInDirection(position, direction)) {
      let disk = this.getValueAt(walkPosition)
      if (disk === opponentDisk) {
        foundOpponentDisk = true
        flippedDisks.push(walkPosition)
      } else if (foundOpponentDisk && disk === this.nextTurnPlayer) {
        return flippedDisks
      } else {
        return []
      }
    }
    return []
  }

  /**
   * Determines if a play is legal, that is if at least one opponent disk is flipped.
   *
   * @param      {Array}   position  The position of the play
   * @return     {boolean}  True if the play is legal, False otherwise.
   */
  isPlayable (position) {
    if (this.getValueAt(position) === Disk.empty) {
      for (let direction of Direction) {
        if (this.disksToFlipFromPositionInDirection(position, direction).length > 0) {
          return true
        }
      }
    }
    return false
  }

  /**
   * Add hints to the board
   * @return     {Number}    The hint count
   */
  prepareHints () {
    let count = 0
    for (let position of this.positions()) {
      if (this.isPlayable(position)) {
        this.setValueAt(position, Disk.hint * this.nextTurnPlayer)
        count++
      }
    }
    return count
  }
}

export default Reversi

import Direction from './Direction'
import Disk, { DiskConstants } from './Disk'

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
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.board[row][col] = new Disk()
      }
    }
    this.currentPlayerDisk = DiskConstants.empty
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
    return this.board[position[0]][position[1]].value
  }

  /**
   * Sets the board value at a given position.
   *
   * @param      {Array}    position  The position of the form: [rowIndex, columnIndex]
   * @param      {Number}   value     The value
   */
  setValueAt (position, value) {
    this.board[position[0]][position[1]].value = value
  }

  /**
   * Reset the board and the next player's turn
   */
  reset () {
    for (const position of this.positions()) {
      this.setValueAt(position, DiskConstants.empty)
    }
    const halfHeight = (this.height - 1) / 2
    const halfWidth = (this.width - 1) / 2
    this.setValueAt([Math.floor(halfHeight), Math.floor(halfWidth)], DiskConstants.light)
    this.setValueAt([Math.floor(halfHeight), Math.ceil(halfWidth)], DiskConstants.dark)
    this.setValueAt([Math.ceil(halfHeight), Math.floor(halfWidth)], DiskConstants.dark)
    this.setValueAt([Math.ceil(halfHeight), Math.ceil(halfWidth)], DiskConstants.light)
    this.currentPlayerDisk = DiskConstants.dark
  }

  /**
   * Removes all hints from the board
   */
  clearHints () {
    for (const position of this.positions()) {
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
    let opponentDisk = this.currentPlayerDisk * -1
    const flippedDisks = []
    for (let walkPosition of this.walkFromPositionInDirection(position, direction)) {
      let disk = this.getValueAt(walkPosition)
      if (disk === opponentDisk) {
        foundOpponentDisk = true
        flippedDisks.push(walkPosition)
      } else if (foundOpponentDisk && disk === this.currentPlayerDisk) {
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
    if (this.getValueAt(position) === DiskConstants.empty) {
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
  addAndCountHints () {
    let count = 0
    for (const position of this.positions()) {
      if (this.isPlayable(position)) {
        this.setValueAt(position, DiskConstants.hint * this.currentPlayerDisk)
        count++
      }
    }
    return count
  }

  /**
   * Execute a play at the given position
   *
   * @param      {Array}  position  The position to be played
   */
  play (position) {
    const takenPositions = [ position ]
    for (const direction of Direction) {
      takenPositions.push(...this.disksToFlipFromPositionInDirection(position, direction))
    }
    takenPositions.forEach(takenPosition => {
      this.setValueAt(takenPosition, this.currentPlayerDisk)
    })
    this.currentPlayerDisk *= -1
  }

  /**
   * Counts the score of each Disk color.
   *
   * @return     {Object}  Dark disk count, light disk count and winner.
   */
  get score () {
    let dark = 0
    let light = 0

    for (const position of this.positions()) {
      const value = this.getValueAt(position)
      if (value === DiskConstants.light) {
        light++
      } else if (value === DiskConstants.dark) {
        dark++
      }
    }

    return {
      light,
      dark
    }
  }

  /**
   * The disks winning the game.
   *
   * @return     {Number}  Disk value of the winners, empty in case of draw.
   */
  get winner () {
    let { dark, light } = this.score
    let winner = DiskConstants.empty

    if (dark > light) {
      winner = DiskConstants.dark
    } else if (dark < light) {
      winner = DiskConstants.light
    }

    return new Disk(winner)
  }

  /**
   * Remove the previous hints, determine the next Disk playing, the score and the end of the game
   *
   * @return     {Number}  The Disk color value for the next playing disks.
   */
  prepareNextTurn () {
    // Remove hints
    this.clearHints()

    let hintCount = this.addAndCountHints()
    if (hintCount === 0) {
      // Current player pass
      this.currentPlayerDisk *= -1
      hintCount = this.addAndCountHints()
      if (hintCount === 0) {
        // Nobody can play, game over
        this.currentPlayerDisk = DiskConstants.empty
      }
    }

    return this.currentPlayerDisk
  }
}

export default Reversi

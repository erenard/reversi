import chai from 'chai'

import Reversi from '../../src/models/Reversi'
import Disk from '../../src/models/Disk'
import Direction from '../../src/models/Direction'

const expect = chai.expect

function expectBlankOthello4x4 (reversi) {
  expect(reversi.getValueAt([1, 1])).to.equal(Disk.light)
  expect(reversi.getValueAt([2, 2])).to.equal(Disk.light)
  expect(reversi.getValueAt([1, 2])).to.equal(Disk.dark)
  expect(reversi.getValueAt([2, 1])).to.equal(Disk.dark)
  for (let i = 0; i < 4; i++) {
    expect(reversi.getValueAt([0, i])).to.equal(Disk.empty)
    expect(reversi.getValueAt([3, i])).to.equal(Disk.empty)
    expect(reversi.getValueAt([i, 0])).to.equal(Disk.empty)
    expect(reversi.getValueAt([i, 3])).to.equal(Disk.empty)
  }
}

describe('Reversi', () => {
  describe('Constructor', () => {
    it('Creates a 8x8 board by default', () => {
      const reversi = new Reversi()
      //
      expect(reversi.height).to.equal(8)
      expect(reversi.width).to.equal(8)
    })
    it('Creates a 4x4 board minimum', () => {
      const reversi = new Reversi(1, 1)
      //
      expect(reversi.height).to.equal(4)
      expect(reversi.width).to.equal(4)
    })
    it('Creates a AxB sized board', () => {
      const a = 23
      const b = 32
      //
      const reversi = new Reversi(a, b)
      //
      expect(reversi.height).to.equal(a)
      expect(reversi.width).to.equal(b)
    })
  })
  describe('* positions()', () => {
    it('Should yield height x width positions', () => {
      const reversi = new Reversi(4, 4)
      let positionCount = 0
      // eslint-disable-next-line
      for (let position of reversi.positions()) {
        positionCount++
      }
      //
      expect(positionCount).to.equal(16)
    })
  })
  describe('setValueAt (position, value)', () => {
    it('should set the given value', () => {
      const reversi = new Reversi(4, 4)
      //
      reversi.setValueAt([0, 0], 123)
      //
      expect(reversi.board[0][0]).to.equal(123)
    })
  })
  describe('getValueAt (position)', () => {
    it('should get the value', () => {
      const reversi = new Reversi(4, 4)
      reversi.board[0][0] = 123
      //
      const value = reversi.getValueAt([0, 0])
      //
      expect(value).to.equal(123)
    })
  })
  describe('reset ()', () => {
    it('Should set the next player to dark', () => {
      const reversi = new Reversi()
      reversi.nextTurnPlayer = -999
      //
      reversi.reset()
      //
      expect(reversi.nextTurnPlayer).to.equal(Disk.dark)
    })
    it('Prepare the board according to the Othello\'s rules', () => {
      const reversi = new Reversi(4, 4)
      for (let position of reversi.positions()) {
        reversi.setValueAt(position, 1 - (position[0] * 4 + position[1]) % 3)
      }
      //
      reversi.reset()
      //
      expectBlankOthello4x4(reversi)
    })
  })
  describe('clearHints ()', () => {
    it('should remove any number\' decimal part', () => {
      const reversi = new Reversi(4, 4)
      for (let position of reversi.positions()) {
        reversi.setValueAt(position, 1.98 * Math.random() - 0.99)
      }
      //
      reversi.clearHints()
      //
      for (let position of reversi.positions()) {
        expect(reversi.getValueAt(position)).to.equal(Disk.empty)
      }
    })
    it('should keep integer numbers', () => {
      const reversi = new Reversi(4, 4)
      //
      reversi.clearHints()
      //
      expectBlankOthello4x4(reversi)
    })
  })
  describe('prepareHints ()', () => {
    it('should count the number of possible plays', () => {
      const reversi = new Reversi(4, 4)
      //
      const value = reversi.prepareHints()
      //
      expect(value).to.equal(4)
    })
    it('should add an hint to the board for possible plays only', () => {
      const reversi = new Reversi()
      reversi.nextTurnPlayer = Disk.light
      const expectedHints = [
        [2, 4],
        [3, 5],
        [4, 2],
        [5, 3]
      ]
      //
      reversi.prepareHints()
      //
      for (const position of reversi.positions()) {
        if (expectedHints.some(expectedHint => expectedHint[0] === position[0] && expectedHint[1] === position[1])) {
          expect(reversi.getValueAt(position)).to.equal(reversi.nextTurnPlayer * Disk.hint)
        } else {
          expect(reversi.getValueAt(position)).not.to.equal(reversi.nextTurnPlayer * Disk.hint)
        }
      }
    })
  })
  describe('isPlayable (position)', () => {
    it('should return false if the position already has a Disk', () => {
      const reversi = new Reversi(4, 4)
      //
      expect(reversi.isPlayable([1, 1])).to.equal(false)
      expect(reversi.isPlayable([1, 2])).to.equal(false)
      expect(reversi.isPlayable([2, 1])).to.equal(false)
      expect(reversi.isPlayable([2, 2])).to.equal(false)
    })
  })
  describe('* walkFromPositionInDirection (position, direction)', () => {
    it('should yield all the positions in a direction until the end of the board', () => {
      const reversi = new Reversi(4, 4)
      let index = 0
      const expectedPositions = [
        [1, 1],
        [2, 2],
        [3, 3]
      ]
      //
      for (let position of reversi.walkFromPositionInDirection([0, 0], Direction.southEast)) {
        expect(position).to.deep.equal(expectedPositions[index++])
      }
    })
  })

  describe('disksToFlipFromPositionInDirection (position, direction)', () => {
    it('should return the possibility of a play in a given position and direction', () => {
      const reversi = new Reversi(4, 4)
      //
      for (let direction of Direction) {
        const isSouth = direction[0] === Direction.south[0] && direction[1] === Direction.south[1]
        expect(reversi.disksToFlipFromPositionInDirection([0, 1], direction).length > 0).to.equal(isSouth)
      }
    })
  })
})

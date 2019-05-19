import chai from 'chai'

import Reversi from '../../src/models/Reversi'
import { DiskConstants } from '../../src/models/Disk'
import Direction from '../../src/models/Direction'

const expect = chai.expect

function expectBlankOthello4x4 (reversi) {
  expect(reversi.getValueAt([1, 1])).to.equal(DiskConstants.light)
  expect(reversi.getValueAt([2, 2])).to.equal(DiskConstants.light)
  expect(reversi.getValueAt([1, 2])).to.equal(DiskConstants.dark)
  expect(reversi.getValueAt([2, 1])).to.equal(DiskConstants.dark)
  for (let i = 0; i < 4; i++) {
    expect(reversi.getValueAt([0, i])).to.equal(DiskConstants.empty)
    expect(reversi.getValueAt([3, i])).to.equal(DiskConstants.empty)
    expect(reversi.getValueAt([i, 0])).to.equal(DiskConstants.empty)
    expect(reversi.getValueAt([i, 3])).to.equal(DiskConstants.empty)
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
      for (const position of reversi.positions()) {
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
      reversi.setValueAt([0, 0], DiskConstants.light)
      //
      expect(reversi.board[0][0].value).to.equal(DiskConstants.light)
    })
  })
  describe('getValueAt (position)', () => {
    it('should get the value', () => {
      const reversi = new Reversi(4, 4)
      reversi.board[0][0].value = DiskConstants.light
      //
      const value = reversi.getValueAt([0, 0])
      //
      expect(value).to.equal(DiskConstants.light)
    })
  })
  describe('reset ()', () => {
    it('Should set the next player to dark', () => {
      const reversi = new Reversi()
      reversi.currentPlayerDisk = DiskConstants.empty
      //
      reversi.reset()
      //
      expect(reversi.currentPlayerDisk).to.equal(DiskConstants.dark)
    })
    it('Prepare the board according to the Othello\'s rules', () => {
      const reversi = new Reversi(4, 4)
      for (const position of reversi.positions()) {
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
      for (const position of reversi.positions()) {
        reversi.setValueAt(position, 1.98 * Math.random() - 0.99)
      }
      //
      reversi.clearHints()
      //
      for (const position of reversi.positions()) {
        expect(reversi.getValueAt(position)).to.equal(DiskConstants.empty)
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
  describe('addAndCountHints ()', () => {
    it('should count the number of possible plays', () => {
      const reversi = new Reversi(4, 4)
      //
      const value = reversi.addAndCountHints()
      //
      expect(value).to.equal(4)
    })
    it('should add an hint to the board for possible plays only', () => {
      const reversi = new Reversi()
      reversi.currentPlayerDisk = DiskConstants.light
      const expectedHints = [
        [2, 4],
        [3, 5],
        [4, 2],
        [5, 3]
      ]
      //
      reversi.addAndCountHints()
      //
      for (const position of reversi.positions()) {
        if (expectedHints.some(expectedHint => expectedHint[0] === position[0] && expectedHint[1] === position[1])) {
          expect(reversi.getValueAt(position)).to.equal(reversi.currentPlayerDisk * DiskConstants.hint)
        } else {
          expect(reversi.getValueAt(position)).not.to.equal(reversi.currentPlayerDisk * DiskConstants.hint)
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
      for (const position of reversi.walkFromPositionInDirection([0, 0], Direction.southEast)) {
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

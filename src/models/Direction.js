
export default {
  northWest: [-1, -1],
  north: [-1, 0],
  northEast: [-1, 1],
  east: [0, 1],
  west: [0, -1],
  southWest: [1, -1],
  south: [1, 0],
  southEast: [1, 1],
  [Symbol.iterator]: function * () {
    yield this.northWest
    yield this.north
    yield this.northEast
    yield this.east
    yield this.west
    yield this.southWest
    yield this.south
    yield this.southEast
  }
}

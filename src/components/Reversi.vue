<template>
  <div class="reversi-container">
    <GameBoard
      :game="game"
      @play="play"
    />
    <GameOver
      :score="score"
      @restart="restart"
    />
  </div>
</template>

<script>
import GameBoard from './GameBoard.vue'
import GameOver from './GameOver.vue'
import Reversi from '../models/Reversi'
import DiskConstants from '../models/DiskConstants'

export default {
  components: {
    GameBoard,
    GameOver
  },
  data: () => ({
    game: undefined,
    disk: undefined,
    score: undefined
  }),
  methods: {
    play (position) {
      this.game.clearHints()
      this.game.play(position)
      this.disk = this.game.prepareNextTurn()
      // TODO
      if (this.disk === DiskConstants.empty) {
        this.score = this.game.countScore()
      }
    },
    restart () {
      this.game.reset()
      this.disk = this.game.prepareNextTurn()
    }
  },
  mounted () {
    this.game = new Reversi()
    this.disk = this.game.prepareNextTurn()
    this.score = this.game.countScore()
  }
}
</script>

<style type="text/css">
.reversi-container {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>

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

export default {
  components: {
    GameBoard,
    GameOver
  },
  data: () => ({
    game: undefined,
    score: undefined
  }),
  methods: {
    play (position) {
      this.game.clearHints()
      this.game.play(position)
      this.score = this.game.prepareNextTurn()
    },
    restart () {
      this.game.reset()
      this.score = this.game.prepareNextTurn()
    }
  },
  mounted () {
    this.game = new Reversi()
    this.score = this.game.prepareNextTurn()
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

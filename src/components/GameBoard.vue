<template>
  <div>
    <div
      v-for="rowIndex in height"
      :key="'row' + rowIndex"
      class="game-board-row"
    >
      <game-board-square
        v-for="columnIndex in width"
        :key="'square' + rowIndex + '-' + columnIndex"
        :disk="board[rowIndex - 1][columnIndex - 1]"
        @play="play([rowIndex - 1, columnIndex - 1])"
      />
    </div>
    <game-score
      :score="score"
      @restart="restart"
    />
  </div>
</template>

<script>
import GameBoardSquare from './GameBoardSquare.vue'
import Reversi from '../models/Reversi'

export default {
  components: {
    'game-board-square': GameBoardSquare
  },
  data: () => ({
    game: null,
    score: null
  }),
  computed: {
    width () {
      return this.game ? this.game.width : 0
    },
    height () {
      return this.game ? this.game.height : 0
    },
    board () {
      return this.game ? this.game.board : 0
    }
  },
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
  watch: {
    score () {

    }
  },
  mounted () {
    this.game = new Reversi()
    this.score = this.game.prepareNextTurn()
  }
}
</script>

<style type="text/css">
.game-board-row {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
}
</style>

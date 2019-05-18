<template>
  <div>
    <div
      v-for="(row, rowIndex) in game.board"
      :key="'row' + rowIndex"
      class="game-board-row"
    >
      <game-board-square
        v-for="(square, columnIndex) in row"
        :key="'square' + rowIndex + '-' + columnIndex"
        :state="square"
        @play="handlePlay([rowIndex, columnIndex])"
      />
    </div>
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
    game: new Reversi()
  }),
  methods: {
    handlePlay (position) {
      this.game.play(position)
    }
  },
  mounted () {
    this.game = new Reversi()
    this.game.prepareHints()
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

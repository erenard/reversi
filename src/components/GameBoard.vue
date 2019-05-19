<template>
  <div>
    <div
      v-for="rowIndex in height"
      :key="'row' + rowIndex"
      class="game-board-row"
    >
      <GameBoardSquare
        v-for="columnIndex in width"
        :key="'square' + rowIndex + '-' + columnIndex"
        :disk="board[rowIndex - 1][columnIndex - 1]"
        @play="play([rowIndex - 1, columnIndex - 1])"
      />
    </div>
  </div>
</template>

<script>
import GameBoardSquare from './GameBoardSquare.vue'

export default {
  components: {
    GameBoardSquare
  },
  props: {
    game: {
      type: Object,
      default: () => null
    }
  },
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
      this.$emit('play', position)
    }
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

<template>
  <div
    v-if="isGameOver"
    class="floating-container">
    <div
      class="game-over-modal"
      @click="handleClick"
    >
      <div>Game Over</div>
      <div v-if="isDraw">Draw</div>
      <div v-else>{{ game.winner.char }} wins !</div>
      <div>{{ game.score.light }} - {{ game.score.dark }}</div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { DiskConstants } from '../models/Disk'

export default {
  props: {
    game: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    isGameOver () {
      return this.game && this.game.currentPlayerDisk === DiskConstants.empty
    },
    isDraw () {
      return this.game && this.game.winner.value === DiskConstants.empty
    }
  },
  methods: {
    handleClick () {
      this.$emit('restart')
    }
  }
}
</script>

<style type="text/css">
.floating-container {
  position: absolute;
}
.game-over-modal {
  border: solid 1vmin black;
  box-shadow: 1vmin;
  background-color: rgb(64, 192, 64);
  display: flex;
  flex-flow: column;
  cursor: pointer;
}
.game-over-modal div {
  font-size: 10vmin;
  padding: 3vmin;
  text-align: center;
}
</style>

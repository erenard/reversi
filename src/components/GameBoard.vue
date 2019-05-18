<template>
  <div>
    <div v-for="rowIndex in rows" :key="rowIndex" class="game-board-row">
      <game-board-square
        v-for="columnIndex in columns"
        :key="columnIndex"
        :rowIndex="rowIndex"
        :columnIndex="columnIndex"
        :state="((columnIndex + rowIndex) % 3) - 1"
        @play="handlePlay(rowIndex, columnIndex)"
      />
    </div>
  </div>
</template>
<script>
import GameBoardSquare from './GameBoardSquare.vue'

export default {
  components: {
    'game-board-square': GameBoardSquare
  },
  props: {
    rows: {
      type: Number,
      required: true
    },
    columns: {
      type: Number,
      required: true
    }
  },
  data: () => ({
  })
}
</script>
<style type="text/css">
.game-board-row {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
}
</style>

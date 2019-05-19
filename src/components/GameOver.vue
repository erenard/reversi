<template>
  <div
    v-if="score.winner"
    class="floating-container">
    <div class="game-over-modal">Game Over</div>
  </div>
</template>

<script type="text/javascript">
import { DiskConstants } from '../models/Disk'

export default {
  data: () => ({
    empty: DiskConstants.empty
  }),
  props: {
    score: {
      type: Object,
      default: () => ({
        winner: null,
        lightScore: 0,
        darkScore: 0
      })
    }
  }
}
</script>

<style type="text/css">
.floating-container {
  position: absolute;
}
.game-over-modal {
  border: solid 5px black;
  box-shadow: 5px;
  background-color: rga(64, 192, 64);
  width: 50vmin;
  height: 50vmin;
}
</style>

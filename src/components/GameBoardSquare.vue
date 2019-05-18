<template>
  <div class="square">
    <span :style="{ opacity: diskAlpha }">
      {{ diskChar }}
    </span>
  </div>
</template>
<script>
import { fromNumber } from '../models/Disk'

export default {
  props: {
    state: {
      type: Number,
      default: 0
    }
  },
  computed: {
    diskChar () {
      return fromNumber(this.state)
    },
    diskAlpha () {
      return Math.min(Math.abs(this.state), 1)
    },
    playable () {
      return this.diskAlpha < 1
    }
  },
  handlePlay () {

  }
}
</script>

<style type="text/css">
.square {
  border: solid .25vmin black;
  background-color: rgb(64, 192, 64);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vmin;
  height: 10vmin;
}
.square span {
  font-size: 7.5vmin;
  line-height: 0;
}
</style>

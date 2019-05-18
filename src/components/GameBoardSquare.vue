<template>
  <div class="square">
    <span>{{ diskChar }}</span>
  </div>
</template>
<script>
import Disk from '../models/Disk'

export default {
  props: {
    rowIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    state: {
      type: Number,
      default: 0
    }
  },
  computed: {
    diskChar () {
      return Disk.fromNumber(this.state)
    }
  }
}
</script>

<style type="text/css">
.square {
  border: solid 1px black;
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

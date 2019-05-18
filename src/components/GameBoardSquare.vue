<template>
  <div class="square" @click="handleClick" :class="{ hint: isHint }">
    <span>
      {{ disk.char }}
    </span>
  </div>
</template>

<script>
import { DiskConstants } from '../models/Disk'

export default {
  props: {
    disk: {
      type: Object,
      required: true
    }
  },
  computed: {
    isHint () {
      return Math.abs(this.disk.value) === DiskConstants.hint
    }
  },
  methods: {
    handleClick () {
      if (this.isHint) {
        this.$emit('play')
      }
    }
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
.hint {
  cursor: pointer;
}
.hint span {
  opacity: .5;
}
</style>

<template>
  <div
    class="square"
    :style="{whiteDisk: state === 1, blackDisk: state === -1}">
    <span>{{ diskChar }}</span>
  </div>
</template>
<script>
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
      if (this.state === 1) return 'W'
      if (this.state === -1) return 'B'
      return ''
    }
  }
}
</script>

<style type="text/css">
.square {
  height: 50px;
  width: 50px;
  border: solid 1px black;
  background-color: rgb(64, 192, 64);
  float: left;
  vertical-align: middle;
}
.whiteDisk {
  background-color: 'white'
}
.blackDisk {
  background-color: 'black'
}
</style>

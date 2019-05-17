<template>
  <span class="square">{{ rowIndex }}, {{ columnIndex }}, {{ state }}</span>
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
  }
}
</script>
<style type="text/css">
.square {
  height: 50px;
  width: 50px;
}
.whiteDisk {

}
.blackDisk {
  
}
</style>
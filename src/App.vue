<template>
  <div id="app">
    <Reversi />
  </div>
</template>

<script>
import Reversi from './components/Reversi.vue'

export default {
  name: 'app',
  components: {
    Reversi
  }
}
</script>

<style>
html {
  background: url(assets/bg.jpg) no-repeat center fixed;
  -webkit-background-size: cover;
  background-size: cover;
}
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>

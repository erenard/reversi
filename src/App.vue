<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <GameBoard :rows="4" :columns="4" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import GameBoard from './components/GameBoard.vue'

export default {
  name: 'app',
  components: {
    GameBoard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <GameBoard :rows="8" :columns="8" />
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
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
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>

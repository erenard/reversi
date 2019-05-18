import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    nextPlayer: 1
  },
  mutations: {
    reset(state) {
      state.nextPlayer = 1
      for(let rowIndex = 0; rowIndex < 8; rowIndex++) {
        state.board[rowIndex].splice(0, 8, 0, 0, 0, 0, 0, 0, 0, 0)
      }
    }
  },
  actions: {
    initialize({ commit }) {
      commit('reset')
    }
  }
})

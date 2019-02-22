const api = {
  state: {
    userId: 'blankshsh'
  },
  mutations: {
    SetUserId(state, val) {
      state.userId = val
    }
  },
  actions: {
    SetUserId({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SetUserId', data)
        resolve()
      })
    },
    getUserId({ commit, state }) {
      return new Promise(resolve => {
        resolve(state.userId)
      })
    }
  }
}
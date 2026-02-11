import Vuex from 'vuex'

// TYPES
const MAIN_SET_USER_ID = 'MAIN_SET_USER_ID'

// STATE
const state = {
  userId: null
}

// MUTATIONS
const mutations = {
  [MAIN_SET_USER_ID](state, id) {
    state.userId = id
  }
}

// ACTIONS
const actions = {
  // Doesn't need to be async really, but I was testing code out
  setUserId({ commit }, id) {
    commit(MAIN_SET_USER_ID, id)
  }
}

// const getters = {
//   //use this if there is a need to get something via here.
//   //else use this on another state. unable to put server side logic here
// }
const store = new Vuex.Store({
  state,
  mutations,
  actions
})
export default store

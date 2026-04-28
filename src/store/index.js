import Vuex from 'vuex'

const MAIN_SET_USER_ID = 'MAIN_SET_USER_ID'

const state = {
  userId: null
}

const mutations = {
  [MAIN_SET_USER_ID](state, id) {
    state.userId = id
  }
}

const actions = {
  setUserId({ commit }, id) {
    commit(MAIN_SET_USER_ID, id)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})
export default store

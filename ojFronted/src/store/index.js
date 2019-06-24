import Vue from 'vue'
import Vuex from 'vuex'
import types from './types'

Vue.use(Vuex)

const rootState = {
  modalStatus: {
    mode: 'login', // or 'register',
    visible: false
  }
}

const rootGetters = {
  'modalStatus'(state) {
    return state.modalStatus
  }
}

const rootMutations = {
  [types.CHANGE_MODAL_STATUS](state, { mode, visible }) {
    if (mode !== undefined) {
      state.modalStatus.mode = mode
    }
    if (visible !== undefined) {
      state.modalStatus.visible = visible
    }
  }
}

const rootActions = {
  changeModalStatus({ commit }, payload) {
    commit(types.CHANGE_MODAL_STATUS, payload)
  },
}

export default new Vuex.Store({
  state: rootState,
  getters: rootGetters,
  mutations: rootMutations,
  actions: rootActions,
})

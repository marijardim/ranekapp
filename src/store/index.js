import { api } from '@/services/index.js'
import { createStore } from 'vuex'

export default createStore({
  state: {
    login: false,
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      postal: '',
      address: '',
      number: '',
      city: '',
      state: ''
    }
  },
  getters: {
  },
  mutations: {
    UPDATE_LOGIN (state, payload) {
      state.login = payload
    },
    UPDATE_USER (state, payload) {
      state.user = payload
    }
  },
  actions: {
    getUser (context, payload) {
      api.get(`/user/${payload}`)
        .then(response => {
          context.commit('UPDATE_USER', response.data)
          context.commit('UPDATE_LOGIN', true)
        })
    }
  },
  modules: {
  }
})

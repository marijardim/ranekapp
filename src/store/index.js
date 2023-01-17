import { api } from '@/services/index.js'
import { createStore } from 'vuex'

export default createStore({
  strict: true,
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
      state.user = Object.assign(state.user, payload)
    }
  },
  actions: {
    getUser (context, payload) {
      return api.get(`/user/${payload}`)
        .then(response => {
          context.commit('UPDATE_USER', response.data)
          context.commit('UPDATE_LOGIN', true)
        })
    },
    createUser (context, payload) {
      context.commit('UPDATE_USER', {
        id: payload.email
      })
      return api.post('/user', payload)
    }
  },
  modules: {
  }
})

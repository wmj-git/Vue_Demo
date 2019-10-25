import { getRsa } from '@/api/login'

const publicKey = {
  state: {
    publicKey: ''
  },
  mutations: {
    SET_PUBLICKEY: (state, key) => {
      state.publicKey = key
    }
  },
  actions: {
    AddPublicKey({ commit }, key) {
      return new Promise(function(resolve, reject) {
        getRsa().then(res => {
          console.log(res);
          commit('SET_PUBLICKEY', res.data)
          resolve(res.data)
        })
      })
    }
  }
}

export default publicKey

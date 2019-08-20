import Vue from 'vue'
import Vuex from 'vuex'
import win from './modules/win'
import user from './modules/user'
import scene from './modules/scene'
import publicKey from './modules/publicKey'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        win,
        user,
        scene,
        publicKey
    }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import win from './modules/win'
import user from './modules/user'
import scene from './modules/scene'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        win,
        user,
        scene
    }
})

export default store

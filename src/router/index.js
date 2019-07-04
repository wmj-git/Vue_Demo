import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import layout from '@/views/layout/layout'
import scene from '@/views/layout/components/scene/scene'
import map from '@/views/layout/components/map/map'
import login from '@/views/login/login'
import admin from '@/views/admin/admin'
import login_erro from "@/views/login_erro/login_erro"

export default new Router({
  mode: "history",
  routes: [
    {
      path: '*',
      redirect: {name: "login"}
    },
    {
      path: '/home',
      name: 'layout',
      component: layout,
      children: [
        {
          path: 'scene',
          name: 'scene',
          components: {
            scene: scene
          }
        },
        {
          path: 'map',
          name: 'map',
          components: {
            scene: map
          }
        }

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/login_erro',
      name: 'login_erro',
      component: login_erro
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children: []
    }
  ]
})

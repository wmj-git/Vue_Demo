import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import layout from '@/views/layout/layout'


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
            scene: () => import('@/views/layout/components/scene/scene')
          }
        },
        {
          path: 'map',
          name: 'map',
          components: {
            scene: () => import('@/views/layout/components/map/map')
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login')
    },
    {
      path: '/login_erro',
      name: 'login_erro',
      component: () => import('@/views/login_erro/login_erro')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/admin'),
      children: []
    }
  ]
})

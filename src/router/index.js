import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import layout from '@/views/layout/layout'
import main from '@/views/main/layout'

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: {name: "layout"}
    },
    {
      path: '/home',
      name: 'layout',
      component: layout,
      redirect: {name: "map"},
      children: [
        {
          path: 'scene',
          name: 'scene',
          components: {
            scene: () => import('@/views/scene/scene')
          }
        },
        {
          path: 'map',
          name: 'map',
          components: {
            scene: () => import('@/views/map/map')
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
      path: '/main',
      name: 'main',
      component: main,
      children: [
        {
          path: 'scene',
          name: 'scene',
          components: {
            scene: () => import('@/views/scene/scene')
          }
        },
        {
          path: 'map',
          name: 'map',
          components: {
            scene: () => import('@/views/map/map')
          }
        }
      ]
    }
  ]
})

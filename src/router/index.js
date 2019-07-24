import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import layout from '@/views/layout/layout'
import main from '@/views/main/layout'

export default new Router({
  mode: "history",
  routes: [
    {
      path: '*',
      redirect: {name: "login"}
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
            scene: () => import('@/views/main/components/scene/scene')
          }
        },
        {
          path: 'map',
          name: 'map',
          components: {
            scene: () => import('@/views/main/components/map/map')
          }
        }

      ]
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
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/admin'),
      children: []
    }
  ]
})

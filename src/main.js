// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill();
// import qs from 'qs'
import "./assets/jquery-easyui-1.6.7/themes/black/easyui.css"
import "./assets/jquery-easyui-1.6.7/themes/icon.css"
import "./assets/jquery-easyui-1.6.7/jquery.easyui.min.js"
import "./assets/js/windowAdapter"
import "@/styles/easyUI/_index.scss"


import ElementUI from 'element-ui'
import "@/styles/elementUI/_index.scss"
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(ElementUI);


import "@/styles/index/_index.scss"
import "@/icons/icon/iconfont.css"

import echarts from 'echarts'    //引入echarts图表
Vue.prototype.$echarts = echarts;


import './directive/drag'

Vue.config.productionTip = false;
Vue.prototype.bus= new Vue(); //vue-bus
/* eslint-disable no-new */

//视屏播放器
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer)

import './permission' // 路由拦截

import * as socketApi from './api/socket'
Vue.prototype.socketApi = socketApi;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

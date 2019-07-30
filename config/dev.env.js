'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://onelz.oicp.vip/api/v1"',
  BASE_API: '"http://zhlh.cqemme.com:6733/api/v1"',
  IMG_API: '"http://zhlh.cqemme.com:6733"',
  // BASE_API: '"http://192.168.20.18:8080/api/v1"',
  //BASE_API: '"http://61.186.187.111:6733/api/v1"',
  SCENE_URL: '"http://192.168.20.18:800"'

})


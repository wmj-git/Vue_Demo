'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
   // BASE_API: '"http://zhlh.cqemme.com:6733/api/v1"',
  BASE_API: '"http://amkj.cqemme.com:1800/api/v1"',
  IMG_API: '"http://zhlh.cqemme.com:6733"',
  SCENE_URL: '"http://192.168.20.18:800"',

})


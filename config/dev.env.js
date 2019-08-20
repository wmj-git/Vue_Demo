'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"http://zhlh.cqemme.com:6733/api/v1"',
  BASE_API: '"http://amkj.cqemme.com:1800/api/v1"',
  // BASE_API: '"http://192.168.20.18:8080/api/v1"',

  IMG_API: '"http://zhlh.cqemme.com:6733"',

  STATIC_URL: '"http://amkj.cqemme.com:1800"'//场景资源地址
})

// process.env.STATIC_URL


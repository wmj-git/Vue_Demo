'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_API: '"http://192.168.20.18:1800/api/v1"',
  IMG_API: '"http://192.168.20.18:1800:6733"',
  STATIC_URL: '"http://192.168.20.18:1800"'
})

'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_API: '"http://zhlh.cqemme.com:6733/api/v1"',
  IMG_API: '"http://zhlh.cqemme.com:6733"',
  STATIC_URL: '"http://zhlh.cqemme.com:6733"'
})

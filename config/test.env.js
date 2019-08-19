'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"testing"',
  BASE_API: '"http://zhlh.cqemme.com:6733/api/v1"',
  IMG_API: '"http://zhlh.cqemme.com:6733"',
  SCENE_URL: '"http://zhlh.cqemme.com:6733"'
})

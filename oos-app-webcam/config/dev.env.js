'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEV_HOST: '"Omega-5169.local"'
  // DEV_HOST: '"omega-f01b.local"'
})

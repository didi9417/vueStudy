const { defineConfig } = require('@vue/cli-service')
//const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false
    }
  }
})

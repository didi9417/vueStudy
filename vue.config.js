const { defineConfig } = require('@vue/cli-service')
//const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave : false, // Vue 파일명 2가지 단어조합 오류 안뜨게
  devServer: {
    client: {
      overlay: false
    }
  }
})

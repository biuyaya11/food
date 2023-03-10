const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        //'http://1.116.64.64:5004/api2/'
        //http://localhost:9527/
        target: 'http://1.116.64.64:5004/api2/',
        changeOrigin: true,   //允许跨域
        pathRewrite: {
          '^/api': ''
        },
      }
    }
  }
})

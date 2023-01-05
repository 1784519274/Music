const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        src: '@'
      }
    }
  },
  devServer: {
    host: 'localhost', // 本地
    port: 8080, // 端口号
    open: true, // 默认false   true自动打开
    // 配置服务器代理
    proxy: {
      '/api': {
        // 代理接口前缀为/apis的请求
        target: 'http://localhost:3000', // 对应的代理地址
        secure: false, // 接受运行在https上，默认不接受
        changeOrigin: true, // 如果设置为true,那么本地会虚拟一个服务器接收你的请求并代你发送该请求，这样就不会有跨域问题（只适合开发环境）
        pathRewrite: {
          // 重写路径 比如'/apis/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
  }
})

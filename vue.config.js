const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        src: '@'
      }
    },
    plugins: [
      AutoImport({
        imports: ['vue', 'vue-router'],
        eslintrc: {
          enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
          filepath: './.eslintrc-auto-import.json', // 生成json文件
          globalsPropValue: true
        }
      })
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
  }
})

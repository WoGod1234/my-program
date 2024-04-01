const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: './',//项目打包加载资源
    runtimeCompiler: true,
    lintOnSave: false,
    transpileDependencies: true,
    devServer: {
        // host: 'localhost', // 本地的IPv4地址
        // port: '8080', // 默认端口为8080，此端口冲突，也会出现代理异常的情
        proxy: {

            '/api': {
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
                pathRewrite: { "^/api": "/api" }
            },

        }
    },
})
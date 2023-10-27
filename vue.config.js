module.exports = {
    publicPath: './',//项目打包加载资源
    runtimeCompiler: true,
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api2': {
                target: 'https://apis.map.qq.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api2': ''
                }
            },
            '/api3': {
                target: 'https://b.huangjw.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api3': ''
                }
            },
        },
    }
}

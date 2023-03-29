module.exports = {
    lintOnSave: true,
    devServer: {
        // 项目运行时候的端口号
        port: 8090,
        //禁用主机检查
        disableHostCheck: true,

        // api 转发
        proxy: {
            '/api': {
              target: 'http://192.168.1.96:8888',
              changeOrigin: true,
              pathRewrite: {
                '^/api': '/api/v1'
              }
            }
          }
    }
}
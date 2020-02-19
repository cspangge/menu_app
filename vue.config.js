module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        target: 'https://sample.com',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};

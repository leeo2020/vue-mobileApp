module.exports = {
  devServer: {
    port: 8081,
    // open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}

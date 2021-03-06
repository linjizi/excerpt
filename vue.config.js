// vue.config.js
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: false,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}
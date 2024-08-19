module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://123.207.32.32:5000",
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};

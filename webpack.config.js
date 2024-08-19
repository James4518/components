const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: ["./src/main.js"],
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, "./build")
  },
  resolve: {
    extensions: [".js", ".ts", ".json", ".mjs", ".vue", ".ts", ".jsx", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
};

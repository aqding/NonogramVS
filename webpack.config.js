const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "client", "src", "index.tsx"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "client", "dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
  devServer: {
    port: 8000,
    proxy: {
      "/api": "http://localhost:3000",
    },
    static: "./client/dist",
    historyApiFallback: true,
  },
};

const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./example/App.js",
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/example",
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./example"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        options: {
          symbolId: "icon-[name]"
        }
      }
    ]
  }
};

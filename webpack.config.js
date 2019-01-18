const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/src/public/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: './client/src',
  output: {
    publicPath: '/',
    path: __dirname + '/client/dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlPlugin],
  devServer: {
    historyApiFallback: true,
  }
};
const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "index.bundle.js",
  },
  devServer: {
    open: true,
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modues/,
        use: ["babel-loader"],
      },
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: path.resolve(__dirname, '/build'),
              publicPath: path.resolve(__dirname, '/build'),
            }
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]",
              }
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCSSExtractPlugin({
      filename: "[name].css",
    })
  ],
};

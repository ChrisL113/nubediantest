const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main/js/index.js',
  mode: 'development',
  output: {
    path: path.join(__dirname, './src/main/resources/static/built/'),
    filename: 'bundle.js',
  },

  devServer: {
    compress: true,
    port: 3030,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource',
        use: ['file-loader'],
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/main/js/index.html',
    }),
  ],
}

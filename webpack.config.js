var webpack = require('webpack'),
    path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    "webpack-hot-middleware/client",
    "./src/index"
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot/webpack', 'babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.json$/,
      loaders: ['json']
    }]
  }
}

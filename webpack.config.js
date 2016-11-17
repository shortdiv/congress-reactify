var webpack = require('webpack'),
    path = require('path');

module.exports = {
  entry: [
    "./src/index"
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: [/\.js$/],
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: [/\.json$/],
      loaders: ['json'],
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

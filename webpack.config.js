var webpack = require('webpack'),
    path = require('path'),
    dotenv = require('dotenv');

    env = dotenv.config();
    //courtesy of https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/#configuring-multiple-environments//
    var envVars =
      Object.keys(env).reduce((memo, key) => {
        const val = JSON.stringify(env[key]);
        memo[`__${key.toUpperCase()}__`] = val;
        return memo;
      },{});

module.exports = {
  devtool: 'eval',
  entry: [
    "whatwg-fetch",
    "webpack-hot-middleware/client",
    "./src/index"
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new webpack.DefinePlugin(envVars)
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot/webpack', 'babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.json$/,
      loaders: ['json']
    }]
  }
}

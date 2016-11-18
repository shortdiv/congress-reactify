var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config');

var compiler = webpack(config)

var server = new WebpackDevServer(compiler, {
  hot: true,
  compress: true,
  setup: function(app) {

  },
  quiet: false,
  lazy: true,
  filename: 'bundle.js',
  watchOptions: {
    aggregateTimeout: 300
  }
});
Server.listen(8080, "localhost", function() {});

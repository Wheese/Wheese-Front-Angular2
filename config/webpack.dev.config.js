var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  title:      'Projet',
  baseUrl:    '/',
  host:       'localhost',
  port:       3000,
  serverHost: 'localhost',
  serverPort: 9000,
  ENV:        ENV
};

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  debug: true,

  output: {
    path: 'dist',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENV':          JSON.stringify(metadata.ENV),
        'NODE_ENV':     JSON.stringify(metadata.ENV),
        'SERVER_HOST':  JSON.stringify(metadata.serverHost),
        'SERVER_PORT':  JSON.stringify(metadata.serverPort)
      }
    })
  ],

  devServer: {
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true,
  }
});

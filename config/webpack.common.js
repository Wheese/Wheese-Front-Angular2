var webpack = require('webpack');
var helpers = require('./helpers');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.json','.css','.html']
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: [ /\.(spec|e2e|async)\.ts$/ ] },

      { test: /\.scss$/,  loaders: ["style", "css", "sass"] },

      { test: /\.json$/,  loader: 'json-loader' },

      { test: /\.css$/,   loader: 'raw-loader' },

      { test: /\.html$/,  loader: 'raw-loader', exclude: [ 'src/index.html' ] },

      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },

      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]


};

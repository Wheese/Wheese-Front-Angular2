var path = require('path');
var zlib = require('zlib');
// Webpack Plugins
var webpack = require('webpack');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash    = require('webpack-md5-hash');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8080;

var metadata = {
  title:      'Projet',
  baseUrl:    '/',
  host:       HOST,
  port:       PORT,
  serverHost: 'localhost',
  serverPort: 9000,
  ENV:        ENV
};

/*
 * Config
 */
module.exports = {
  metadata: metadata,

  devtool: 'source-map',
  debug: false,

  entry: { 'polyfills': './src/polyfills.ts', 'main': './src/main.ts' },

  // Config for our build files
  output: {
    path: 'dist',
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  resolve: {
    extensions: ['', '.ts','.js','.json','.css','.html']
  },

  module: {
    preLoaders: [

      { test: /\.js$/, loader: "source-map-loader", exclude: [ 'node_modules/rxjs' ] }
    ],
    loaders: [

      { test: /\.async\.ts$/, loaders: ['es6-promise-loader', 'ts-loader'], exclude: [ /\.(spec|e2e)\.ts$/ ] },

      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          // remove TypeScript helpers to be injected below by DefinePlugin
          'compilerOptions': {
            'removeComments': true
          }
        },
        exclude: [
          /\.(spec|e2e)\.ts$/,
        ]
      },

      { test: /\.scss$/,  loaders: ["style", "css", "sass"] },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader', exclude: [ root('src/index.html') ] },

      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}

    ]
  },

  plugins: [
    new ForkCheckerPlugin(),
    new WebpackMd5Hash(),
    new DedupePlugin(),
    new OccurenceOrderPlugin(true),
    new CommonsChunkPlugin({
      name: 'polyfills',
      filename: 'polyfills.[chunkhash].bundle.js',
      chunks: Infinity
    }),
    // static assets
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV),
        'SERVER_HOST':  JSON.stringify(metadata.serverHost),
        'SERVER_PORT':  JSON.stringify(metadata.serverPort)
      }
    }),
    new UglifyJsPlugin({
      // to debug prod builds uncomment //debug lines and comment //prod lines

      // beautify: true,//debug
      // mangle: false,//debug
      // dead_code: false,//debug
      // unused: false,//debug
      // deadCode: false,//debug
      // compress : { screw_ie8 : true, keep_fnames: true, drop_debugger: false, dead_code: false, unused: false, }, // debug
      // comments: true,//debug

      beautify: false,//prod
      // disable mangling because of a bug in angular2 beta.1, beta.2 and beta.3
      // TODO(mastertinner): enable mangling as soon as angular2 beta.4 is out
      // mangle: { screw_ie8 : true },//prod
      mangle: {
        screw_ie8 : true,
        except: [
          'RouterActive',
          'RouterLink',
          'RouterOutlet',
          'NgFor',
          'NgIf',
          'NgClass',
          'NgSwitch',
          'NgStyle',
          'NgSwitchDefault',
          'NgModel',
          'NgControl',
          'NgFormControl',
          'NgForm',
          'AsyncPipe',
          'DatePipe',
          'JsonPipe',
          'NumberPipe',
          'DecimalPipe',
          'PercentPipe',
          'CurrencyPipe',
          'LowerCasePipe',
          'UpperCasePipe',
          'SlicePipe',
          'ReplacePipe',
          'I18nPluralPipe',
          'I18nSelectPipe'
        ] // needed for uglify RouterLink problem
      },
      compress : { screw_ie8 : true},//prod
      comments: false//prod

    }),
   // include uglify in production
    new CompressionPlugin({
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    })
  ],

  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
    customAttrAssign: [ /\)?\]?=/ ]
  },

  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}

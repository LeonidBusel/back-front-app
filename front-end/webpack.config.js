const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

let config = {
  context: __dirname + '/app',

  resolve: {
    alias: {
      'actions': path.resolve(__dirname, 'app/model/actions'),
      'components': path.resolve(__dirname, 'app/view/components'),
      'config': path.resolve(__dirname, 'app/config'),
      'containers': path.resolve(__dirname, 'app/view/containers'),
      'reducers': path.resolve(__dirname, 'app/model/reducers'),
      'sagas': path.resolve(__dirname, 'app/model/sagas'),
      'store': path.resolve(__dirname, 'app/model/store'),
      'utils': path.resolve(__dirname, 'app/model/utils')
    }
  },

  entry: './index.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'build')
  },

  resolveLoader: {
    modules: ['node_modules'],
    moduleExtensions: ['-loader'],
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(less|css)$/,
        loader: 'style!css!postcss!less'
      }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          },
          output: {
            comments: false
          },
          warnings: true,
        },
      }),
    ],
  },

  plugins: [
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],

  devServer: {
    port: 8091,
    contentBase: "./build",
    historyApiFallback: true,
    inline: true,
    open: true,
      headers: {
          'Access-Control-Allow-Origin': '*'
      }
  }
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    config.plugins.push(new HtmlMinifierPlugin());
  }

  return config;
};
// Import modules
const webpack        = require('webpack'), //to access built-in plugins
      path           = require('path'),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Defining relative path
const srcPath  = path.join(__dirname, './src/'),
      distPath = path.join(__dirname, './dist/');

// Set the configs for webpack
const config = {
  // Continuously watching
  watch: true,

  // Create relative path for the src
  context: srcPath,

  // Define the entry
  entry: {
    main: './main.js',
  },

  // Define the Output
  output: {
    path: distPath,
    filename: '[name].js',
  },

  // Add the eval Source Map
  devtool: 'cheap-eval-source-map',

  // What modules webpack actually should use
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // options for the loader
        options: {
          presets: [
            'babel-preset-es2015',
            'babel-preset-es2016',
          ],
          plugins: [
            'babel-plugin-syntax-trailing-function-commas',
            'babel-plugin-transform-class-properties',
            'babel-plugin-transform-object-rest-spread',
          ]
        },
      }
    ]
  },

  // Uglify with source map
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
  ]
};

// Use the configs for webpack
module.exports = config;

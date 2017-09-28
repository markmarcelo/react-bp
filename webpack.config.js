const path = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const cssProdConfig = ExtractTextWebpackPlugin.extract({
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true
      }
    },
    'postcss-loader',
    'sass-loader'
  ],
  fallback: 'style-loader'
});

const cssDevConfig = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: true
    }
  },
  'sass-loader',
  'postcss-loader'
];

const cssConfig = process.env.NODE_ENV === 'development' ? cssDevConfig : cssProdConfig;

const config = {
  context: __dirname,
  entry: ['./src/Root.jsx'],
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-eval-source-map' : false,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  devServer: {
    hot: true,
    publicPath: '/dist/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /(\.css|\.sass|\.scss)$/,
        exclude: /node_modules/,
        use: cssConfig
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextWebpackPlugin({
      filename: 'styles.css',
      disable: !process.env.NODE_ENV === 'development',
      allChunks: true
    })
  ]
};

module.exports = config;

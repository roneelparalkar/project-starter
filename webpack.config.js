/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

const destinationFolder = 'dist';

module.exports = {
  performance: {
    maxEntryPointSize: 9000000,
    maxAssetSize: 9000000,
  },
  devServer: {
    port: 9000,
    disableHostCheck: true,
  },
  entry: './src/assets/js/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, destinationFolder),
    filename: '[name].js',
    chunkFileName: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
      filename: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets'),
          to: path.resolve(__dirname, destinationFolder, 'assets'),
          globOptions: {
            ignore: path.resolve(__dirname, 'src', 'assets', 'js'),
          },
        },
      ],
    }),
    new ESLintPlugin(),
    new WebpackAutoInject({
      components: {
        AutoIncreaseVersion: false,
      },
    }),
  ],
};

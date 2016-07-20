import path from 'path';
import webpack from 'webpack';

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    './index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    alias: {
      'react-flyd-class': path.join(__dirname, '..', 'src'),
    },
    extensions: ['', '.js'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname,
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, '..', 'src'),
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }],
  },
};

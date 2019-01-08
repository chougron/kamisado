const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const getPath = path.join.bind(path, __dirname, '..');

const sources = getPath('src');
const dist = getPath('build');
const indexTemplate = getPath('public/index.html');

const EXTRACT_CSS = process.env.NODE_ENV === 'production';
const APPLY_OPTIMIZATIONS = process.env.NODE_ENV === 'production';

const scssLoaders = cssOptions => [
  EXTRACT_CSS ? MiniCssExtractPlugin.loader : 'style-loader',
  {
    loader: 'css-loader',
    options: cssOptions,
  },
  'sass-loader',
];

function devServer(useHttps) {
  const conf = {
    contentBase: dist,
    compress: true,
    port: process.env.FRONT_PORT,
    host: '0.0.0.0',
    historyApiFallback: true,
  };

  if (useHttps) {
    conf.https = {
      key: fs.readFileSync(process.env.TLS_PRIVATE_KEY),
      cert: fs.readFileSync(process.env.TLS_CERTIFICATE),
    };
  }

  return conf;
}

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['@babel/polyfill', sources],
  output: {
    path: dist,
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: scssLoaders({}),
      },
      {
        test: /\.css$/,
        exclude: /\.module\.scss$/,
        use: scssLoaders({}),
      },
      {
        test: /\.module\.scss$/,
        use: scssLoaders({
          modules: true,
          localIdentName: '[name]__[local]--[hash:base64:5]',
        }),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: EXTRACT_CSS ? '[name].[hash].css' : '[name].css',
      chunkFilename: EXTRACT_CSS ? '[id].[hash].css' : '[id].css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: indexTemplate,
      publicUrl: process.env.PUBLIC_URL,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL),
      },
    }),
    new CopyWebpackPlugin([
      {
        from: getPath('public'),
        ignore: 'index.html',
        to: dist,
      },
    ]),
    new webpack.HashedModuleIdsPlugin(),
  ],
  devServer: devServer(process.env.USE_HTTPS === 'true'),
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  optimization: APPLY_OPTIMIZATIONS
    ? {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
        },
      }
    : {},
};

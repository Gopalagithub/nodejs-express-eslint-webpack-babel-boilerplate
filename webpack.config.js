const path = require('path');
const nodeExternals = require('webpack-node-externals');
const glob = require('glob');

function toObject(paths) {
  const ret = {};
  paths.forEach((loc) => {
    ret[loc] = loc;
  });
  return ret;
}


module.exports = {
  mode: 'production',
  entry: toObject(glob.sync('./server')),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: 'node_modules',
  },
  devServer: {
    lazy: true,
    contentBase: './dist',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false,
  },
};

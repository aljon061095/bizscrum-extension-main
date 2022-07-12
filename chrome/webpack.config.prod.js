const { CheckerPlugin } = require('awesome-typescript-loader');
const { join } = require('path');
const { optimize } = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    contentPage: join(__dirname, 'src/content-page.ts'),
    contextMenu: join(__dirname, 'src/context-menu.ts'),
    serviceWorker: join(__dirname, 'src/service-worker.ts')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: join(__dirname, '../dist'),
    filename: '[name].js'
  },
  plugins: [new CheckerPlugin(), new optimize.AggressiveMergingPlugin()],
  resolve: {
    extensions: ['.ts', '.js']
  }
};

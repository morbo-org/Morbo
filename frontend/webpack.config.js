import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

export default {
  entry: './src/index.tsx',
  mode: 'production',
  output: {
    filename: 'index.js',
    path: import.meta.dirname + '/dist',
    clean: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  devServer: {
    client: {
      overlay: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    })],
};
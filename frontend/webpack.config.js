import path from "path";

import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";

const config = {
  entry: { index: "./src/index.tsx" },
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(import.meta.dirname, "dist"),
    clean: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            passes: 2,
          },
          format: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: "single",
    moduleIds: "deterministic",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  cache: {
    type: "filesystem",
    compression: "brotli",
  },
  devServer: {
    port: 8085,
    client: {
      overlay: false,
    },
  },
  resolve: {
    extensions: [".tsx"],
    symlinks: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      scriptLoading: "module",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx$/,
        include: path.join(import.meta.dirname, "src"),
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        include: path.join(import.meta.dirname, "src"),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
};

export default (_, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
  }
  return config;
};

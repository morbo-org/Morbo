import fs from "fs";
import path from "path";

import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import WorkboxPlugin from "workbox-webpack-plugin";

export default (env, argv) => {
  const devMode = argv.mode === "development";
  const watchMode = env.WEBPACK_WATCH || false;

  const assets = fs.readdirSync("./public/assets");
  const numberOfAssets = assets.length;

  return {
    entry: { index: "./src/index.tsx" },
    mode: "production",
    output: {
      clean: watchMode
        ? {
            keep: /(assets\/|manifest\..*\.webmanifest)/,
          }
        : true,
      filename: "[name].[contenthash].js",
      path: path.join(import.meta.dirname, "dist"),
      publicPath: "",
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
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
      symlinks: false,
    },
    devtool: devMode ? "source-map" : false,
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
        scriptLoading: "module",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new WorkboxPlugin.InjectManifest({
        exclude: [/\.map$/, /^assets\/.*\.png$/],
        swSrc: "./public/service-worker.ts",
      }),
      new webpack.DefinePlugin({
        DEV_MODE: devMode,
        NUMBER_OF_ASSETS: numberOfAssets,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: [
            path.join(import.meta.dirname, "src"),
            path.join(import.meta.dirname, "public"),
          ],
          loader: "ts-loader",
        },
        {
          test: /\.css$/,
          include: path.join(import.meta.dirname, "src"),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { modules: true } },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          include: path.join(import.meta.dirname, "public", "assets"),
          type: "asset/resource",
          generator: {
            filename: "assets/[name].[contenthash][ext]",
          },
        },
        {
          test: /\.webmanifest$/i,
          include: path.join(import.meta.dirname, "public"),
          loader: "webpack-webmanifest-loader",
          type: "asset/resource",
          generator: {
            filename: "[name].[contenthash][ext]",
          },
        },
        {
          test: /\.html$/,
          include: path.join(import.meta.dirname, "public"),
          loader: "html-loader",
        },
      ],
    },
  };
};

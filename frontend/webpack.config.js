import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";

const config = {
  entry: { index: "./src/index.tsx" },
  mode: "production",
  output: {
    filename: "[name].js",
    path: import.meta.dirname + "/dist",
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
  },
  devServer: {
    port: 8085,
    client: {
      overlay: false,
    },
  },
  resolve: {
    extensions: [".js", "*.jsx", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      scriptLoading: "module",
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
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

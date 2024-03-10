import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

const config = {
  entry: "./src/index.tsx",
  mode: "production",
  output: {
    filename: "index.js",
    path: import.meta.dirname + "/dist",
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
    port: 8085,
    client: {
      overlay: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", "*.jsx", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      scriptLoading: "module",
    }),
  ],
};

export default (_, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
  }
  return config;
};

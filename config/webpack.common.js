const paths = require("./paths");

//plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");

const isDev = process.env.NODE_ENV === "development";

const jsxLoaders = {
  test: /\.jsx?/i,
  exclude: /node_modules/,
  use: "babel-loader"
};

const cssLoaders = {
  test: /\.(sa|sc|c)ss$/i,
  use: [
    isDev
      ? "style-loader"
      : {
          loader: MiniCssExtractPlugin.loader
        },
    {
      loader: "css-loader",
      options: {
        importLoaders: 2,
        modules: {
          auto: /components/,
          localIdentName: `${isDev ? "[path][name]__[local]" : "[hash:base64]"}`
        }
      }
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [["postcss-preset-env"]]
        }
      }
    },
    { loader: "sass-loader" }
  ]
};

const imageLoaders = {
  test: /\.(png|jpe?g|gif)$/i,
  type: "asset"
};

const svgLoaders = {
  test: /\.svg$/i,
  use: [
    {
      loader: "url-loader",
      options: {
        generator: (content) => svgToMiniDataURI(content.toString())
      }
    }
  ]
};

module.exports = {
  target: isDev ? "web" : ["web", "es5"],
  entry: paths.appEntryJS,
  output: {
    path: paths.appBuild,
    filename: "bundle.[contenthash].js",
    assetModuleFilename: "images/[hash][ext][query]"
  },
  resolve: {
    extensions: [".jsx", ".js"],
    alias: paths.alias
  },
  module: {
    rules: [jsxLoaders, cssLoaders, imageLoaders, svgLoaders]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHTML,
      filename: "index.html",
      favicon: `${paths.alias.images}/favicon.ico`
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "styles.css" : "styles.[contenthash].css"
    }),
  ]
};

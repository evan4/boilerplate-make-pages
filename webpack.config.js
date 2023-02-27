const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
  {
    entry: {
      app: './src/app.js',
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist'),
      assetModuleFilename: path.join('images', '[name][ext]'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            { loader: "style-loader", options: { injectType: "styleTag" } },
            "css-loader",
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                warnRuleAsWarning: false,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "autoprefixer",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      //new HtmlWebpackPlugin(), // Generates default index.html
      new HtmlWebpackPlugin({
        template: './src/index.handlebars',
        minify: false,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      port: 8080,
      hot: true,
      watchFiles: ['src/*.handlebars', 'public/**/*'],
    },
    mode: 'development',
    name: 'first',
  },
];

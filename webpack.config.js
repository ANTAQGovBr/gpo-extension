const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

module.exports = function (env, argv) {
  return {
    context: __dirname,
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'cheap-source-map',
    optimization: env.production
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              extractComments: false,
            }),
          ],
        }
      : {},

    entry: {
      background: path.resolve(__dirname, 'src/pages/Background/index.ts'),
      buttonsScript: path.resolve(
        __dirname,
        'src/pages/Content/buttonsScript.tsx'
      ),
      buttonProcessScript: path.resolve(
        __dirname,
        'src/pages/Content/buttonProcessScript.tsx'
      ),
      dialogScript: path.resolve(
        __dirname,
        'src/pages/Content/dialogScript.tsx'
      ),
      gridScript: path.resolve(__dirname, 'src/pages/Content/gridScript.tsx'),
      options: path.resolve(__dirname, 'src/pages/Options/index.tsx'),
      popup: path.resolve(__dirname, 'src/pages/Popup/popup.tsx'),
      snackbarScript: path.resolve(
        __dirname,
        'src/pages/Content/snackbarScript.tsx'
      ),
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '',
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
          type: 'asset/resource',
        },
      ],
    },

    resolve: {
      extensions: fileExtensions
        .map((extension) => `.${extension}`)
        .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new CleanWebpackPlugin({ verbose: false }),
      new webpack.ProgressPlugin(),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),

      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/assets/img/icon.png',
            to: path.join(__dirname, 'dist'),
            force: true,
          },
        ],
      }),

      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/manifest.json',
            to: path.join(__dirname, 'dist'),
            force: true,
          },
        ],
      }),

      new HtmlWebpackPlugin({
        filename: 'options.html',
        chunks: ['options'],
        cache: false,
      }),

      new HtmlWebpackPlugin({
        filename: 'popup.html',
        chunks: ['popup'],
        cache: false,
      }),
    ],

    infrastructureLogging: {
      level: 'info',
    },
  };
};

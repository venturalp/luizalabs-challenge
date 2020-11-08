require('dotenv').config()
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const templateHtml = require('html-webpack-template')
const config = require('./src/Config/Config.app')
const { CleanWebpackPlugin: CleanFolder } = require('clean-webpack-plugin')

// const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = () => {
  const distPath = 'dist'

  const { ENVIRONMENT: environment = 'dev' } = process.env

  const terserConfig = new TerserPlugin({
    test: /\.js(\?.*)?$/i,
    terserOptions: {
      format: {
        comments: /@license/i,
      },
    },
    extractComments: true,
  })

  const minifyHtml = () => {
    if (environment === 'prd') {
      return {
        collapseWhitespace: true,
      }
    }

    return null
  }

  const htmlPlugin = new HtmlWebpackPlugin({
    template: templateHtml,
    filename: './index.html',
    appMountId: 'app', // Id app mount React
    title: config.title,
    lang: 'pt-br',
    meta: config.meta,
    links: config.links,
    favicon: './src/Assets/favicon.png',
    inject: false, // it is necessary to avoid duplicate meta tags and to allows html-webpack-template works properly
    minify: minifyHtml(),
  })

  const envDictionary = {
    dev: 'Development',
    prd: 'Production',
    hml: 'Homologation',
  }

  console.log('ENVIRONMENT', envDictionary[environment])

  return {
    module: {
      rules: [
        {
          test: /\.(js)x?$/, // regex to find files that webpack applies
          resolve: {
            extensions: ['.js', '.jsx'], // resolves files extensiosn
          },
          exclude: /node_modules/, // avoiding node_module folders
          use: {
            loader: 'babel-loader', // using babel loader for transpiling es6 to es5
            options: {
              cacheDirectory: true, // option to transpile only modfied files
            },
          },
        },
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
        {
          test: /\.svg$/,
          use: {
            loader: '@svgr/webpack',
            options: {
              native: false,
              dimensions: false,
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
                publicPath: '../fonts/',
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /_redirects$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '/[name]',
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    performance: {
      hints: false,
    },
    devtool: environment === 'prd' ? 'none' : 'source-map',
    optimization: {
      minimize: environment === 'prd',
      minimizer: environment === 'prd' ? [terserConfig] : [],
    },
    entry: './src/index.jsx', // main file to generates the bundle
    output: {
      // output settings
      path: path.resolve(__dirname, `${distPath}`), // it defines its output folder
      // it sets the name according to the development/production mode
      filename: `js/index${environment === 'dev' ? '' : '.min'}.js`,
      publicPath: '/',
    },
    plugins: [new CleanFolder(), htmlPlugin],
    devServer: {
      // webpack dev server settings
      contentBase: path.join(__dirname, distPath), // point to the path to run on server
      compress: true, // it defines if it should be compressed
      watchContentBase: true, // watch changes on file and re-run the application
      port: 3000, // port
      historyApiFallback: true, // it's used to fix router problemas with react-router and index.html defaull fallback https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
      writeToDisk: true, // Tells devServer to write generated assets to the disk.
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        Commons: path.resolve(__dirname, 'src/Commons'),
        Config: path.resolve(__dirname, 'src/Config'),
        Modules: path.resolve(__dirname, 'src/Modules'),
        Assets: path.resolve(__dirname, 'src/Assets'),
      },
    },
  }
}

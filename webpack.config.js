const path = require('path');

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebPackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const flexbugs = require('postcss-flexbugs-fixes');

const packageJson = require('./package.json');

const hgDependencies = (() => {
  if (packageJson.hgDependencies) {
    return packageJson.hgDependencies;
  }

  if (packageJson.devDependencies) {
    return Object.keys(packageJson.devDependencies)
      .filter(dependency => dependency.indexOf('higlass') === 0)
      .reduce((dependencies, dependency) => {
        dependencies[dependency] = packageJson.devDependencies[dependency];
        return dependencies;
      }, {});
  }

  if (packageJson.dependencies) {
    return Object.keys(packageJson.dependencies)
      .filter(dependency => dependency.indexOf('higlass') === 0)
      .reduce((dependencies, dependency) => {
        dependencies[dependency] = packageJson.dependencies[dependency];
        return dependencies;
      }, {});
  }

  return {};
})();

module.exports = (envs, argv) => ({
  output: {
    filename: 'higlass-image.min.js',
    library: 'higlass-image',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'node_modules/higlass/build'),
    ],
    watchContentBase: true,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'index',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      // Run ESLint first
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
        },
      },
      // Transpile the ESD6 files to ES5
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Convert SASS to CSS, postprocess it, and bundle it
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: { safe: true },
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                flexbugs,
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          'sass-loader',  // compiles Sass to CSS
        ],
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
    }),
    new webpack.DefinePlugin({
      DEPENDENCIES: JSON.stringify(hgDependencies),
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      isProduction: argv.mode === 'production',
    }),
    new UnminifiedWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
});

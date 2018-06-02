const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths');
const loaders = require('./loaders');

module.exports = {
    mode: 'production',
    entry: [
        paths.appIndexJs
    ],
    output: {
        path: paths.appBuild,
        filename: 'static/js/bundle.js',
        publicPath: paths.publicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            loaders.eslintLoader,
            loaders.babelLoader,
            loaders.cssExtractLoader,
            loaders.scssExtractLoader,
            loaders.fileLoader
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new SWPrecacheWebpackPlugin({
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                    return;
                }
                if (message.indexOf('Skipping static resource') === 0) {
                    return;
                }
                console.log(message);
            },
            minify: true,
            navigateFallback: paths.publicUrl + '/index.html',
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};
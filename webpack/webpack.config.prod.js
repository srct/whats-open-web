const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const paths = require('./paths');
const loaders = require('./loaders');

module.exports = {
    mode: 'production',
    entry: [
        paths.appIndexJs
    ],
    output: {
        path: paths.appBuild,
        filename: paths.appOutputJs,
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
            loaders.fileLoader,
            loaders.faviconManifestLoader,
            loaders.appleAppSiteAssociationLoader
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                uglifyOptions: {
                    compress: {
                        typeofs: false // Causes issues with mapbox.
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new CleanWebpackPlugin([paths.appBuild], {
            root: paths.appRoot
        }),
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
                minifyURLs: true
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
            navigateFallback: `${paths.publicUrl}/index.html`,
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.DefinePlugin({
            'process.env.API_GET_FACILITIES': process.env.API_GET_FACILITIES
        })
    ]
};
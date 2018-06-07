const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths');
const loaders = require('./loaders');

module.exports = {
    mode: 'development',
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
            loaders.cssLoader,
            loaders.scssLoader,
            loaders.fileLoader,
            loaders.faviconManifestLoader
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: paths.appBuild,
        hot: true,
        port: 3000,
        compress: true
    }
};
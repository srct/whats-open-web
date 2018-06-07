const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const eslintLoader = {
    test: /\.(js|jsx)$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    include: paths.appSrc
};

const babelLoader = {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    include: paths.appSrc
};

const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: () => [require('autoprefixer')]
    }
};

const cssLoader = {
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader',
        postCssLoader
    ]
};

const scssLoader = {
    test: /\.scss$/,
    use: [
        'style-loader',
        'css-loader',
        postCssLoader,
        'sass-loader'
    ]
};

const cssExtractLoader = {
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        postCssLoader
    ]
};

const scssExtractLoader = {
    test: /\.scss$/,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        postCssLoader,
        'sass-loader'
    ]
};

const fileLoader = {
    exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.scss$/,
        /\.json$/,
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/
    ],
    loader: require.resolve('file-loader'),
    options: {
        name: 'static/media/[name].[hash:8].[ext]'
    }
};

const faviconManifestLoader = {
    type: 'javascript/auto',
    test: /(favicon.png|manifest.json)$/,
    loader: 'file-loader',
    options: {
        name: '[name].[ext]'
    }
};

const appleAppSiteAssociationLoader = {
    test: /apple-app-site-association$/,
    loader: 'file-loader',
    options: {
        name: '.well-known/[name]'
    }
};

module.exports = {
    eslintLoader: eslintLoader,
    babelLoader: babelLoader,
    cssLoader: cssLoader,
    scssLoader: scssLoader,
    cssExtractLoader: cssExtractLoader,
    scssExtractLoader: scssExtractLoader,
    fileLoader: fileLoader,
    faviconManifestLoader: faviconManifestLoader,
    appleAppSiteAssociationLoader: appleAppSiteAssociationLoader
};
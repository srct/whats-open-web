const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    appBuild: resolveApp('build'),
    appSrc: resolveApp('src'),
    appDist: resolveApp('dist'),
    publicPath: ''
};
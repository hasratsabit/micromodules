
const ExpressServer = require('./packages/ExpressServer').getInstance();
const FilePathLoader = require('./packages/FilePathLoader').getInstance();

module.exports = {
    ExpressServer,
    FilePathLoader
}
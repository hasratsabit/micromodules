
const ExpressServer = require('./packages/ExpressServer').getInstance();
const FilePathLoader = require('./packages/FilePathLoader').getInstance();
const RouteLoader = require('./packages/RouteLoader').getInstance();
const TokenService = require('./packages/TokenService').getInstance();

module.exports = {
    ExpressServer,
    FilePathLoader,
    RouteLoader,
    TokenService
}
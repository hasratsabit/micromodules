
const ExpressServer = require('./packages/ExpressServer').getInstance();
const FilePathLoader = require('./packages/FilePathLoader').getInstance();
const RouteLoader = require('./packages/RouteLoader').getInstance();
const TokenService = require('./packages/TokenService').getInstance();
const ValidationService = require('./packages/ValidationService').getInstance();
const ReponseHandler = require('./packages/ResponseHandler');

module.exports = {
    ExpressServer,
    FilePathLoader,
    RouteLoader,
    TokenService,
    ValidationService,
    ReponseHandler
}
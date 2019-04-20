
const ExpressServer = require('./packages/ExpressServer').getInstance();
const FileLoader = require('./packages/FileLoader').getInstance();
const RouteLoader = require('./packages/RouteLoader').getInstance();
const TokenService = require('./packages/TokenService').getInstance();
const ValidationService = require('./packages/ValidationService').getInstance();
const ResponseHandler = require('./packages/ResponseHandler');
const ModelLoader = require('./packages/ModelLoader').getInstance();
const PasswordService = require('./packages/PasswordService').getInstance();
const MongoConnector = require('./packages/MongoConnector').getInstance();
const ServiceLoader = require('./packages/ServiceLoader').getInstance();


module.exports = {
    ExpressServer,
    FileLoader,
    RouteLoader,
    TokenService,
    ValidationService,
    ResponseHandler,
    ModelLoader,
    PasswordService,
    MongoConnector,
    ServiceLoader
}
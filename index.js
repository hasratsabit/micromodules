
const ExpressServer = require('./packages/ExpressServer').getInstance();
const FileLoader = require('./packages/FileLoader').getInstance();
const RouteLoader = require('./packages/RouteLoader').getInstance();
const TokenService = require('./packages/TokenService').getInstance();
const ValidationService = require('./packages/ValidationService').getInstance();
const ReponseHandler = require('./packages/ResponseHandler');
const ModelLoader = require('./packages/ModelLoader').getInstance();
const PasswordService = require('./packages/PasswordService').getInstance();
const MongoConnector = require('./packages/MongoConnector').getInstance();


module.exports = {
    ExpressServer,
    FileLoader,
    RouteLoader,
    TokenService,
    ValidationService,
    ReponseHandler,
    ModelLoader,
    PasswordService,
    MongoConnector
}
const FileLoader = require("./FileLoader").getInstance();
const ModelLoader = require('./ModelLoader').getInstance();

class ServiceLoader {
    constructor() {}

    loadServices(directoryPath, modelsList, identifier = "") {
        if(!directoryPath) throw new Error("No directory is provided.");
        identifier = identifier || "service";
        let servicesArray = FileLoader.loadFiles(directoryPath, identifier);
        let servicesList = new Map();
        for(let serviceObject of servicesArray) {
            let service = serviceObject.getService();
            servicesList.set(service.name, new service.service(modelsList));
        }
        return servicesList;
    }
}

class ServiceLoaderSingleton {
    static getInstance() {
        if(!ServiceLoaderSingleton.instance) ServiceLoaderSingleton.instance = new ServiceLoader();
        return ServiceLoaderSingleton.instance;
    }
}

module.exports = ServiceLoaderSingleton;
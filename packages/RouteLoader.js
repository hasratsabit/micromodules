const FileLoader = require('../packages/FileLoader').getInstance();

class RouteLoader {
    constructor() {}
    loadRoutes(routesPath, server, services, identifier = "") {
        if(!routesPath) throw new Error("No path provided for routes.");
        identifier = identifier || "route"
        let  routesArray = FileLoader.loadFiles(routesPath, identifier);
        for(let Route of routesArray) {
            let routeInstance = new Route(server, services);
            if(!routeInstance.register) throw new Error("Register function is missing. Please register routes.");
            routeInstance.register();
        }
        
    }
}

class RouteLoaderSingleton {
    static getInstance() {
        if(!RouteLoaderSingleton.instance) RouteLoaderSingleton.instance = new RouteLoader();
        return RouteLoaderSingleton.instance;
    }
}


module.exports = RouteLoaderSingleton;
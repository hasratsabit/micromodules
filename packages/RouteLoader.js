const FilePathLoaderSingleton = require('./FilePathLoader');

class RouteLoader {
    constructor() {}
    loadRoutes(routesArray, server) {
        if(!Array.isArray(routesArray)) routesArray = [routesArray];
        for(let Route of routesArray) {
            let routeInstance = new Route(server);
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
const FilePathLoaderSingleton = require('./FilePathLoader');

class RouteLoader {
    constructor() {}
    load(routesDirPath, server) {
        let pathLoader = FilePathLoaderSingleton.getInstance();
        let routesArray = pathLoader.loadPaths(routesDirPath, 'route');
        for(let route of routesArray) {
            let Route = require(route);
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
const FileLoader = require('./FileLoader').getInstance();

class ModelLoader {
    constructor() {}
    loadModels(modelsPath, identifier = "") {
        try {
            if(!modelsPath) throw new Error("No model path was provided.");
            identifier = identifier || "model";
            let modelsArray = FileLoader.loadFiles(modelsPath, identifier);
            if(!modelsArray || modelsArray.length === 0) return [];
            let models = new Map();
            for(let schemaModel of modelsArray) {
                if(!schemaModel.load) throw new Error("No load function is provided.");
                let modelInstance = schemaModel.load();
                models.set(modelInstance.name, modelInstance.model);
            }
            return models;
        } catch (error) {
            throw error;
        }
    }
}

class ModelLoaderSingleton {
    static getInstance() {
        if(!ModelLoaderSingleton.instance) ModelLoaderSingleton.instance = new ModelLoader();
        return ModelLoaderSingleton.instance;
    }
}



module.exports = ModelLoaderSingleton;
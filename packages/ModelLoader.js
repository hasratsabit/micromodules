class ModelLoader {
    constructor() {}
    load(modelsPathArray = []) {
        try {
            if(!modelsPathArray || modelsPathArray.length === 0) throw new Error("No able to import models.");
            let models = new Map();
            for(let schemaModel of modelsPathArray) {
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
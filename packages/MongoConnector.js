const mongoose = require('mongoose');

class MongoConnector {
    connect(uri = "") {
        return new Promise(async (resolve, reject) => {
            try {
                let mongo_uri = uri || 'mongodb://localhost:27017';
                await mongoose.connect(mongo_uri, {useNewUrlParser: true, useCreateIndex: true});
                console.log("Database has successfully started.");
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }
}

class MongoConnectSingleton {
    static getInstance() {
        if(!MongoConnectSingleton.instance) MongoConnectSingleton.instance = new MongoConnector();
        return MongoConnectSingleton.instance;
    }
}

module.exports = MongoConnectSingleton;
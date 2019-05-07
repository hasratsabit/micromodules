
const fs= require('fs');
const path = require('path');

class FilesLoader {
    isDirectory(source) {
        return fs.lstatSync(source).isDirectory(); 
    }

    processFile(fileName, filterIdentifier) {
        if(!fileName || !filterIdentifier) throw new Error("One of the parameters is missing.");
        let splitedFileName = fileName.split(".");
        if(!splitedFileName && splitedFileName.length < 3) return false;
        return splitedFileName[splitedFileName.length - 2] === filterIdentifier;
    }

    loadFilesPath(directoryPath) {
        let directoryContents = fs.readdirSync(directoryPath);
        let filesPathArray = [];
        for(let content of directoryContents) {
            let filesPath;
            let innerContents = path.join(directoryPath, content);
            if(this.isDirectory(innerContents)) {
               filesPath = this.loadFilesPath(innerContents);
            } else {
                filesPath = innerContents;
            }
            filesPathArray.push(filesPath);
        }
    
        let combinedFilesPathArray = [].concat.apply([], filesPathArray);
        return combinedFilesPathArray;  
    }

    loadFiles(directory, identifier) {
        if(!directory || !identifier) throw new Error("One or more parameters are missing.");
        let filesPathArray = this.loadFilesPath(directory);
        if(!filesPathArray || filesPathArray.length === 0) return [];
        let loadedFilesArray = [];
        for(let filePath of filesPathArray) {
            let baseFileName = path.basename(filePath);
            let isFileMatched = this.processFile(baseFileName, identifier);
            let loadedFile;
            if(isFileMatched) loadedFile = require(path.resolve(filePath));
            if(typeof loadedFile === 'function') loadedFilesArray.push(loadedFile); 
        }
        return loadedFilesArray;
    }
}

class FilesLoaderSingleton {
    static getInstance() {
        if(!FilesLoaderSingleton.instance) FilesLoaderSingleton.instance = new FilesLoader();
        return FilesLoaderSingleton.instance;
    }
}

module.exports = FilesLoaderSingleton;

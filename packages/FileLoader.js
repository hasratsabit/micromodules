const {lstatSync, readdirSync} = require('fs');
const path = require('path');

class FileLoader {
    constructor(){
        this.identifier;
        this.directoryPath;
    }

    isDirectory(directory) {
        return lstatSync(directory).isDirectory();
    }

    identifyFile(file) {
        let splitedFile = file.split(".");
        let isMatchedFile = (splitedFile.length && splitedFile.length > 2) ? splitedFile[splitedFile.length - 2] === this.identifier : false;
        if(isMatchedFile) return splitedFile.join(".");
    }

    getFilesPath() {
        let dirPath = this.directoryPath;
        let filesPathArray = [];
        readdirSync(dirPath).map((nestedContent) => {
            let nestedDirPath = path.join(dirPath, nestedContent);
            if(!this.isDirectory(nestedDirPath)) {
               let identifiedFile = this.identifyFile(nestedContent);
                if(identifiedFile) filesPathArray.push(path.join(dirPath, identifiedFile));
            }
            else if(this.isDirectory(nestedDirPath)) {
                readdirSync(nestedDirPath).map((file) => {
                   let identifiedFile = this.identifyFile(file);
                   if(identifiedFile) filesPathArray.push(path.join(nestedDirPath, identifiedFile));
                })
            }
        })
        return filesPathArray;
    }

    loadFiles(directoryPath, identifier) {
        if(!directoryPath || !identifier) throw new Error("One of the parameters is missing.");
        if(!this.isDirectory(directoryPath)) throw new Error("Provided argument is not a directory.");
        this.directoryPath = directoryPath;
        this.identifier = identifier;
        let filesPathArray = this.getFilesPath();
        let loadedFilesArray = []
        for(let filePath of filesPathArray) {
            let loadedFile = require(path.resolve(filePath));
            loadedFilesArray.push(loadedFile);
        }
        return loadedFilesArray;
    }
    
}


class FileLoaderSingleton {
    static getInstance() {
        if(!FileLoaderSingleton.instance) FileLoaderSingleton.instance = new FileLoader();
        return FileLoaderSingleton.instance;
    }
}

module.exports = FileLoaderSingleton;
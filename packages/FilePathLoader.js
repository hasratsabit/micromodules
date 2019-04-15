const {
    lstatSync,
    readdirSync
} = require('fs');
const path = require('path');
class FilePathLoader {
    constructor() {}

    formatFilePath(dirPath, file, identifier) {
        let splitedFile = file.split(".");
        let isMatchedIdentifier = (splitedFile.length && splitedFile.length > 2) ? splitedFile[splitedFile.length - 2] === identifier : false;
        if (!isMatchedIdentifier) return false;
        splitedFile.splice(splitedFile.indexOf("js"));
        let combinedDirs = dirPath.split("/");
        // If the first directory is the same as the formatted dir passed to loadPaths, delete the passed root dir.
        if (combinedDirs[0] === this.formattedDirPath) combinedDirs.shift();
        combinedDirs = path.join(this.directoryPath, combinedDirs.toString()); // Add the main the dir with full path
        let formatedFilePath = path.join(combinedDirs, splitedFile.join(".")); // Add combined dirs with formated file.
        return formatedFilePath;
    }

    loadPaths(directoryPath, identifier) {
        this.directoryPath = directoryPath; // Make it available to the entire class.
        this.formattedDirPath = directoryPath.split(".").join("").split(""); // Delete any dot passed as full path and recreate char array.
        if (this.formattedDirPath[0] === '/') this.formattedDirPath.shift();
        this.formattedDirPath = this.formattedDirPath.join("");

        let filesPathArray = [];
        let isDirectory = (source) => lstatSync(source).isDirectory();
        if (!isDirectory(this.formattedDirPath)) throw new Error("Please provide a directory path.");
        readdirSync(this.formattedDirPath).map(dirContent => {
            let nestedDir = path.join(this.formattedDirPath, dirContent);
            if (!isDirectory(nestedDir)) {
                let isValidPath = this.formatFilePath(directoryPath, dirContent, identifier);
                if (isValidPath) filesPathArray.push(isValidPath);
            } else return readdirSync(nestedDir).map(nestedFile => {
                let validFilePath = this.formatFilePath(nestedDir, nestedFile, identifier)
                if (validFilePath) filesPathArray.push(validFilePath);
            })
        });
        return filesPathArray;

    }
}

class FilePathLoaderSingleton {
    static getInstance() {
        if (!FilePathLoaderSingleton.instance) FilePathLoaderSingleton.instance = new FilePathLoader();
        return FilePathLoaderSingleton.instance;
    }
}

module.exports = FilePathLoaderSingleton;
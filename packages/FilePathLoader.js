class FilePathLoader {
    constructor() {}

    loadPaths(dirPath, identifier) {
        let filesPathArray = [];
        let isDirectory = source => lstatSync(source).isDirectory();
        const processFilePath = (dirPath, file, identifier) => {
            let splitedFile = file.split(".");
            let isMatchedIdentifier = splitedFile[splitedFile.length - 2] === identifier;
            if(!isMatchedIdentifier) return false;
            // splitedFile.splice(splitedFile.indexOf("js"));
            let formatedFilePath = `${dirPath}/${splitedFile.join(".")}`;
            return formatedFilePath;
        }
        if(!isDirectory(dirPath)) throw new Error("Please provide a directory path.");
        readdirSync(dirPath).map(dirContent => {
            let nestedDir = `${dirPath}/${dirContent}`;
            if(!isDirectory(nestedDir)) {
                let isValidPath = processFilePath(dirPath, dirContent, identifier);
                if(isValidPath) filesPathArray.push(isValidPath);
            } 
            else return readdirSync(nestedDir).map(nestedFile => {
               let validFilePath = processFilePath(nestedDir, nestedFile, identifier)
               if(validFilePath) filesPathArray.push(validFilePath);
            })
        });
        return filesPathArray;
    }
}

class FilePathLoaderSingleton {
    static getInstance() {
        if(!FilePathLoaderSingleton.instance) FilePathLoaderSingleton.instance = new FilePathLoader();
        return FilePathLoaderSingleton.instance; 
    }
}
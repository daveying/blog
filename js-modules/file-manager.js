(function () {
    const fs = require('fs');
    const pth = require('path');
    
    FileManager = function (options) {
        this.baseDir = options.baseDir;
        if (!this.baseDir) throw 'base directory is requried.';
        this.structure = undefined;
    };
    
    function walkThrough(targetPath, callback) {
        var files = fs.readdirSync(targetPath, 'utf8');
        var lenFiles = files.length;
        var tree = {
            treePath: targetPath,
            dirs: [],
            files: []
        };
        for (let i = 0; i < lenFiles; i++) {
            let filePath = pth.join(targetPath, files[i]);
            let stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                tree.dirs.push(walkThrough(filePath, callback));
            } else {
                tree.files.push({
                    path: filePath,
                    fsstat: stat,
                    userData: callback(filePath)
                });
            }
        }
        return tree;
    }
    
    FileManager.prototype.updateStructure = function (callback) {
        callback = callback || function () {};
        this.structure = walkThrough(this.baseDir, callback);
    }
    module.exports = FileManager;
})();


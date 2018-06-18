var FileManager = FileManager || {};

(function (FileManager) {
    const fs = require('fs');
    const pth = require('path');
    
    var FileManager = function (options) {
        this.baseDir = options.baseDir;
        if (!this.baseDir) throw 'base directory is requried.';
        this.structure = undefined;
        this.mainContent = '';
    };
    
    function formHtmlNode(type, id, calss, content) {
        return `<${type} id='${id}' class='${calss}'>${content}</${type}>`;
    }
    
    function formList(dirObj, ordered) {
        let listType = 'ol';
        if (ordered === undefined) listType = 'ul';
        var htmlStr = `<${listType}>${formDir(dirObj, ordered)}<${listType}>`;
        return htmlStr;
    }
    
    function formDir(dirObj, ordered) {
        let listType = 'ol';
        if (ordered === undefined) listType = 'ul';
    
        var htmlStr = `<li id='${pth.relative(this.baseDir, dirObj.treePath)}' class='mdsrc-folder'>${pth.basename(dirObj.treePath)}<${listType}>`;
        let lenDir = dirObj.dirs.length;
        for (let i = 0; i < lenDir; i++) {
            htmlStr += formDir(dirObj.dirs[i], ordered);
        }
        let lenFiles = dirObj.files.length;
        for (let i = 0; i < lenFiles; i++) {
            htmlStr += formHtmlNode('li', pth.relative(this.baseDir, dirObj.files[i].path), 'mdsrc-file', pth.basename(dirObj.files[i].path));
        }
        htmlStr += `</${listType}></li>`;
        return htmlStr;
    }
    
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
                tree.dirs.push(walkThrough(filePath));
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
        this.structure = walkThrough(this.baseDir, callback);
        this.mainContent = formList(this.structure);
    }
})(FileManager);

module.exports = FileManager;

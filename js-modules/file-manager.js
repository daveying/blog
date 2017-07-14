const fse = require('fs-extra');
const fs = require('fs');
const klaw = require('klaw');
const pth = require('path');

var FileManager = function () {
    this.structure = undefined;
    this.mainContent = '';
};
const baseDir = pth.resolve(__dirname, '../md-src');

function formHtmlNode(type, id, calss, content) {
    return `<${type} id='${id}' class='${calss}'>${content}</${type}>`;
}

function formList(dirObj, ordered) {
    let type = 'ul';
    if (ordered === undefined) type = 'ol';

    var htmlStr = `<${type}>${dirObj.treePath}`;
    let lenDir = dirObj.dirs.length;
    for (let i = 0; i < lenDir; i++) {
        htmlStr += formHtmlNode('li', dirObj.dirs[i].treePath, '', formList(dirObj.dirs[i], ordered));
    }
    let lenFiles = dirObj.files.length;
    for (let i = 0; i < lenFiles; i++) {
        htmlStr += formHtmlNode('li', dirObj.files[i].path, '', pth.basename(dirObj.files[i].path));
    }
    htmlStr += `</${type}>`;
    return htmlStr;
}

function walkThrough(targetPath) {
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
            tree.files.push({path: filePath, fsstat: stat});
        }
    }
    return tree;
}

FileManager.prototype.updateStructure = function () {
    this.structure = walkThrough(baseDir);
    this.mainContent = formList(this.structure);
    //console.dir(structure);
}

module.exports = new FileManager();

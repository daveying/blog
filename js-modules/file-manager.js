const fse = require('fs-extra');
const fs = require('fs');
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
    let listType = 'ol';
    if (ordered === undefined) listType = 'ul';
    var htmlStr = `<${listType}>${formDir(dirObj, ordered)}<${listType}>`;
    return htmlStr;
}

function formDir(dirObj, ordered) {
    let listType = 'ol';
    if (ordered === undefined) listType = 'ul';

    var htmlStr = `<li id='${pth.relative(baseDir, dirObj.treePath)}' class='mdsrc-folder'>${pth.basename(dirObj.treePath)}<${listType}>`;
    let lenDir = dirObj.dirs.length;
    for (let i = 0; i < lenDir; i++) {
        htmlStr += formDir(dirObj.dirs[i], ordered);
    }
    let lenFiles = dirObj.files.length;
    for (let i = 0; i < lenFiles; i++) {
        htmlStr += formHtmlNode('li', pth.relative(baseDir, dirObj.files[i].path), 'mdsrc-file', pth.basename(dirObj.files[i].path));
    }
    htmlStr += `</${listType}></li>`;
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

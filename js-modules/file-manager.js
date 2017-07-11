const fse = require('fs-extra');
const fs = require('fs');
const klaw = require('klaw');
const path = require('path');


var FileManager = function () {
    this.structure = undefined;
    this.mainContent = '';
};
const baseDir = path.resolve(__dirname, '../md-src');

function formHtmlNode(type, id, calss, content) {
    return `<${type} id='${id}' class='${calss}'>${content}</${type}>`;
}

function formList(dirObj, ordered) {
    let type = 'ul';
    if (ordered === undefined) type = 'ol';

    var htmlStr = `<${type}>`;
    let lenDir = dirObj.dirs.length;
    for (let i = 0; i < lenDir; i++) {
        htmlStr += formHtmlNode('li', dirObj.dirs[i].path, '', formList(dirObj.dirs[i], ordered));
    }
    let lenFiles = dirObj.files.length;
    for (let i = 0; i < lenFiles; i++) {
        htmlStr += formHtmlNode('li', dirObj.files[i].path, '', dirObj.files[i].path);
    }
    htmlStr += `</${type}>`;
    return htmlStr;
}

function walkThrough(path) {
    var files = fs.readdirSync(path, 'utf8');
    var lenFiles = files.length;
    var tree = {
        dirs: [],
        files: []
    };
    for (let i = 0; i < lenFiles; i++) {
        let stat = fs.statSync(path + '/' + files[i]); // FIXME
        if (stat.isDirectory()) {
            tree.dirs.push(walkThrough(path + '/' + files[i]));
        } else {
            tree.files.push({path: path + '/' + files[i], fsstat: stat});
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

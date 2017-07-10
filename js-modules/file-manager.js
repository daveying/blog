const fse = require('fs-extra');
const fs = require('fs');
const klaw = require('klaw');


var FileManager = function () {};

FileManager.prototype.updateStructure = function () {
    console.log('updateStructure');
    var structure = [];
    klaw('../md-src')
        .on('data', function (item) {
            structure.push(item.path);
        })
        .on('end', function () {
            console.dir(structure);
        });
}

module.exports = new FileManager();

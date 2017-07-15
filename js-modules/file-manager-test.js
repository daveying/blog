var fm = require('./file-manager.js');
var fs = require('fs');
var fse = require('fs-extra');

fm.updateStructure();
fs.writeFile('result.html', fm.mainContent, 'utf8', () => {});
//console.dir(fm.mainContent);
fse.writeJson('structure.json', fm.structure, {spaces: '\t'}, err => {
    if(err) return console.log(err);
    console.log('success!');
});



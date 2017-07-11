var fm = require('./file-manager.js');
var fs = require('fs');

fm.updateStructure();
fs.writeFile('result.html', fm.mainContent, 'utf8', () => {});
//console.dir(fm.mainContent);



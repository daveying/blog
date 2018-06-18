(function () {    
    var FM = require('../js-modules/file-manager.js');
    var fs = require('fs');
    var fse = require('fs-extra');
    var path = require('path');
    
    var fm = new FM({baseDir: path.join(__dirname, '../md-src/')});

    describe('Read markdown src directory', () => {
        it('should return markdown src as json', () => {
            fm.updateStructure();
            fs.writeFile('result.html', fm.mainContent, 'utf8', (err) => { if (err) throw err; });
            fse.writeJson('structure.json', fm.structure, {spaces: '\t'}, err => {
                if (err) throw err;
            });
        });
    });
})();

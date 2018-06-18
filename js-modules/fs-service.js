(function () {

    const MetaDataHandler = require('./metadata-handler');
    const MdAbstract = require('./md-abstract');
    const path = require('path');
    const fs = require('fs');
    const FM = require('./file-manager');
    const srcDirName = 'md-src/';

    var fm = new FM({
        baseDir: path.join(__dirname, `../${srcDirName}`)
    });

    var _readCallback = function (filePath) {
        if (!/.md$/.test(filePath)) return; // filter out .md files only
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw 'Read file error {1}.';
            var results = MetaDataHandler.extractMetadata(data);
            var fileId = encodeURIComponent(filePath.split(srcDirName)[1]); // key = encodeURIComponent(filePath)
            this.files[fileId] = {
                md: data,
                metadata: results.metadata,
                createdDate: results.metadata['created-date'],
                tags: results.metadata['tags'],
                viewCount: Math.floor(1000 * Math.random(0, 1)),
                like: false,
                id: fileId,
                title: results.title || '',
                abstract: MdAbstract.extractAbstract(data)
            };
        });
    }

    FSService = function () {
        this.files = {};
        fm.updateStructure(_readCallback.bind(this));
    }
    FSService.prototype.getAllArticals = function () {
        return this.files;
    }
    module.exports = FSService;

})();


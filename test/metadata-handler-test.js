var assert = require('assert');
var MetadataHandler = require('../js-modules/metadata-handler');

(function () {
    describe('Single line of metadata, `[_metadata_:author]:- "daveying"`:', function () {
        it('should return {"author: daveying"}', function () {
            var results = MetadataHandler.extractMetadata('[_metadata_:author]:- "daveying"');
            assert.equal(results.author, 'daveying');
        });
    });
})();

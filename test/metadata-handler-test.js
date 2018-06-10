var assert = require('assert');
var MetadataHandler = require('../js-modules/metadata-handler');

(function () {
    describe('Single line of metadata:', () => {
        it('should return {"author": "daveying"}', () => {
            var results = MetadataHandler.extractMetadata('[_metadata_:author]:- "daveying"');
            assert.equal(results.author, 'daveying');
        });
        it('should return chinese characters correctly', () => {
            var results = MetadataHandler.extractMetadata(`[_metadata_:author]:- '汉字'`);
            assert.equal(results.author, '汉字');
        });
        it('should return key with spaces correctly', () => {
            var results = MetadataHandler.extractMetadata(`[_metadata_:author 0]:- '汉字'`);
            assert.equal(results['author 0'], '汉字');
        });
        it('should return value with space correctly', () => {
            var results = MetadataHandler.extractMetadata(`[_metadata_:author]:- '汉字 中国'`);
            assert.equal(results.author, '汉字 中国');
        });
    });
    describe('Multi-line of metadata:', () => {
        it('should return {"author": "daveying", "tags": "web"}', () => {
            var results = MetadataHandler.extractMetadata(`[_metadata_:author]:- 'daveying'\n[_metadata_:tags]:- '汉字 chinese'`);
            assert.equal(results.author, 'daveying');
            assert.equal(results.tags, '汉字 chinese');
        });
        it('should just extract the metadata at the top', () => {
            var results = MetadataHandler.extractMetadata(`\n\n[_metadata_:author]:- 'daveying'\n#Tile\n[_metadata_:tags]:- '汉字 chinese'`);
            assert.equal(results.author, 'daveying');
            assert.equal(results.tags, undefined);
        });
    });
    describe('Support metadata value be array', () => {
        it('should return array value', () => {
            var results = MetadataHandler.extractMetadata(`[_metadata_:author]:- 'daveying'\n[_metadata_:tags]:- '汉字|chinese'`, '|');
            assert.equal(results.author, 'daveying');
            assert.equal(results.tags[0], '汉字');
            assert.equal(results.tags[1], 'chinese');
        });
    });
})();

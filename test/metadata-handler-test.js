var assert = require('assert');
var MetadataHandler = require('../js-modules/metadata-handler');

(function () {
    // tests for extract metadata
    describe('Single line of metadata:', () => {
        it('should return {"author": "daveying"}', () => {
            var results = MetadataHandler.extractMetadata('[_metadata_:author]:- "daveying"');
            assert.strictEqual(results.metadata.author, 'daveying');
            assert.strictEqual(results.md, "");
        });
        it('should return chinese characters correctly', () => {
            var results = MetadataHandler.extractMetadata(`[_metadata_:author]:- '汉字'`);
            assert.strictEqual(results.metadata.author, '汉字');
            assert.strictEqual(results.md, "");
        });
        it('should return key with spaces correctly', () => {
            var results = MetadataHandler.extractMetadata(`[_metadata_:author 0]:- '汉字'`);
            assert.strictEqual(results.metadata['author 0'], '汉字');
            assert.strictEqual(results.md, "");
        });
        it('should return value with space correctly', () => {
            var results = MetadataHandler.extractMetadata(`[_metadata_:author]:- '汉字 中国'`);
            assert.strictEqual(results.metadata.author, '汉字 中国');
            assert.strictEqual(results.md, "");
        });
        it('should return {}', () => {
            var results = MetadataHandler.extractMetadata(`# [_metadata_:author]:- '汉字 中国'`);
            assert.deepEqual(results.metadata, {});
            assert.strictEqual(results.md, `# [_metadata_:author]:- '汉字 中国'`);
        });
    });
    describe('Multi-line of metadata:', () => {
        it('should return {"author": "daveying", "tags": "web"}', () => {
            var results = MetadataHandler.extractMetadata(`[_metadata_:author]:- 'daveying'\n[_metadata_:tags]:- '汉字 chinese'`);
            assert.strictEqual(results.metadata.author, 'daveying');
            assert.strictEqual(results.metadata.tags, '汉字 chinese');
            assert.strictEqual(results.md, "");
        });
        it('should just extract the metadata at the top', () => {
            var results = MetadataHandler.extractMetadata(`\n\n[_metadata_:author]:- 'daveying'\n#Tile\n[_metadata_:tags]:- '汉字 chinese'`);
            assert.strictEqual(results.metadata.author, 'daveying');
            assert.strictEqual(results.metadata.tags, undefined);
            assert.strictEqual(results.md, `#Tile\n[_metadata_:tags]:- '汉字 chinese'`);
        });
    });
    describe('Support metadata value be array', () => {
        it('should return array value', () => {
            var results = MetadataHandler.extractMetadata(`[_metadata_:author]:- 'daveying'\n[_metadata_:tags]:- '汉字|chinese'`, '|');
            assert.strictEqual(results.metadata.author, 'daveying');
            assert.strictEqual(results.metadata.tags[0], '汉字');
            assert.strictEqual(results.metadata.tags[1], 'chinese');
            assert.strictEqual(results.md, "");
        });
    });

    // tests for write metadata
    describe('Support add metadata to content', () => {
        it('should return [_metadata_:author]:- "daveying"', () => {
            var mdStr = '';
            var result = MetadataHandler.addMetadata({author: "daveying"}, mdStr);
            assert.strictEqual(result.trim(), `[_metadata_:author]:- "daveying"`);
        });
        it('should return \\n[_metadata_:author]:- "daveying"', () => {
            mdStr = '\n';
            var result = MetadataHandler.addMetadata({author: "daveying"}, mdStr);
            assert.strictEqual(result.trim(), `[_metadata_:author]:- "daveying"`);
        });
        it('should return [_metadata_:author]:- "daveying"\\n# title', () => {
            mdStr = '# title';
            var result = MetadataHandler.addMetadata({author: "daveying"}, mdStr);
            assert.strictEqual(result, `[_metadata_:author]:- "daveying"\n# title`);
        });
    });
    describe('Support add array metadata to content', () => {
        it('should return array metadata string with right seperator', () => {
            mdStr = '[_metadata_:author]:- "daveying"\n# title';
            var result = MetadataHandler.addMetadata({tags: ["daveying", "中国"]}, mdStr);
            assert.strictEqual(result, `[_metadata_:author]:- "daveying"\n[_metadata_:tags]:- "daveying|中国"\n# title`);
        });
    });
})();

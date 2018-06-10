/*
Format
  [_metadata_:author]:- "daveying"
  [_metadata_:tags]:- "markdonw metadata"
*/
var MetadataHandler = {} || MetadataHandler;

(function (MetadataHandler) {
    MetadataHandler.extractMetadata = function (mdStr) {
        var lines = mdStr.split('\n');
        console.log('lines', lines);
        var regexp = /\[_metadata_:([^\u0000-\u007F]+)\]:-\s+['"]([^\u0000-\u007F]+)['"]/u
        var result = {};
        for (var i = 0, l = lines.length; i < l; i++) {
            var pair = regexp.exec(lines[i]);
            if (pair && pair[0] && pair[1]) {
                result[pair[0]] = pair[1];
            }
        }
        return result;
    }
})(MetadataHandler);

module.exports = MetadataHandler;

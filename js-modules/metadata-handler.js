/*
Format
  [_metadata_:author]:- "daveying"
  [_metadata_:tags]:- "markdonw metadata"
*/
var MetadataHandler = {} || MetadataHandler;

(function (MetadataHandler) {
    MetadataHandler.extractMetadata = function (mdStr, seperator) {
        var lines = mdStr.split('\n');
        var regexp = /\[_metadata_:([\u0000-\uffef]+)\]:-\s+['"]([\u0000-\uffef]+)['"]/u
        var result = {};
        var started = false;
        for (var i = 0, l = lines.length; i < l; i++) {
            var pair = regexp.exec(lines[i]);
            if (pair && pair[1] && pair[2]) {
                started = true;
                if (seperator) {
                    var arr = pair[2].split(seperator);
                }
                result[pair[1]] = arr && arr.length > 1 ? arr : pair[2];
            } else if (started) {
                break;
            }
        }
        return result;
    }
})(MetadataHandler);

module.exports = MetadataHandler;

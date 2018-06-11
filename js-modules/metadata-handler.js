/*
Format
  [_metadata_:author]:- "daveying"
  [_metadata_:tags]:- "markdonw metadata"
*/
var MetadataHandler = {} || MetadataHandler;

(function (MetadataHandler) {
    MetadataHandler.extractMetadata = function (mdStr, seperator) {
        seperator = seperator || '|';
        var lines = mdStr.split('\n');
        var regexp = /\[_metadata_:([\u0000-\uffef]+)\]:-\s+['"]([\u0000-\uffef]+)['"]/u;
        var metadata = {};
        for (var i = 0, l = lines.length; i < l; i++) {
            var pair = regexp.exec(lines[i]);
            if (pair && pair[1] && pair[2]) {
                if (seperator) {
                    var arr = pair[2].split(seperator);
                }
                metadata[pair[1]] = arr && arr.length > 1 ? arr : pair[2];
            } else if (lines[i].trim() !== '') {
                break;
            }
        }
        var extractedMd = lines.slice(i, lines.length).join('\n');
        console.log(extractedMd);
        return { metadata, md: extractedMd};
    };

    MetadataHandler.addMetadata = function (metadata, mdStr, seperator) {
        seperator = seperator || '|';
        var lines = mdStr.split('\n');
        var regexp = /\[_metadata_:([\u0000-\uffef]+)\]:-\s+['"]([\u0000-\uffef]+)['"]/u;
    };
})(MetadataHandler);

module.exports = MetadataHandler;

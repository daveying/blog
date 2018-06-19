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
        var regexp = /^\[_metadata_:([\u0000-\uffef]+)\]:-\s+['"]([\u0000-\uffef]+)['"]$/u;
        var metadata = {};
        var titleRex = /^# /;
        var title = '';
        for (var i = 0, l = lines.length; i < l; i++) {
            var trimedLine = lines[i].trim();
            var pair = regexp.exec(trimedLine);
            if (pair && pair[1] && pair[2]) {
                if (seperator) {
                    var arr = pair[2].split(seperator);
                }
                metadata[pair[1]] = arr && arr.length > 1 ? arr : pair[2];
            }
            if (titleRex.test(trimedLine)) {
                title = trimedLine.split('# ')[1];
                break;
            }
        }
        var extractedMd = lines.slice(i + 1, lines.length).join('\n');
        return { metadata, md: extractedMd, title: title};
    };

    MetadataHandler.addMetadata = function (metadata, mdStr, seperator) {
        seperator = seperator || '|';
        var results = MetadataHandler.extractMetadata(mdStr, seperator);
        var oldMetadata = results.metadata;
        var keys = Object.keys(oldMetadata);
        for (let key of keys) {
            metadata[key] = oldMetadata[key];
        }
        var metadataStr = '';
        keys = Object.keys(metadata);
        keys = keys.sort((a, b) => a > b);
        for (let key of keys) {
            if (metadata[key] instanceof Array) {
                metadataStr += `[_metadata_:${key}]:- "`;
                for (let idx = 0, l = metadata[key].length; idx < l; idx++) {
                    metadataStr += `${metadata[key][idx]}`;
                    if (idx + 1 !== l) {
                        metadataStr += `|`;
                    }
                }
                metadataStr += `"\n`;
            } else {
                metadataStr += `[_metadata_:${key}]:- "${metadata[key]}"\n`;
            }
        }
        return metadataStr + results.md;
    };
})(MetadataHandler);

module.exports = MetadataHandler;

var MdAbstract = MdAbstract || {};

(function (MdAbstract) {

    var md = require('markdown-it')();
    const linesOfAbstract = 5;

    MdAbstract.extractAbstract = function (mdStr) {
        var lines = mdStr.split('\n');
        var regexp = /^\[_metadata_:([\u0000-\uffef]+)\]:-\s+['"]([\u0000-\uffef]+)['"]$/u;
        var count = 0;
        var result = [];
        var flag = false; // if contains ```
        for (var line of lines) {
            var trimedLine = line.trim();
            var isMetaData = regexp.test(trimedLine);
            var isTitle = trimedLine.indexOf('# ') >= 0;
            if (trimedLine !== '' && !isTitle && !isMetaData) {
                count++;
            }
            if (trimedLine.indexOf('```') >= 0) {
                flag = !flag;
            }
            if (!isMetaData && !isTitle) {
                result.push(line);
            }
            if (flag === false && count >= linesOfAbstract) {
                break;
            }
        }
        // var mdHtml = md.render(result.join('\n'));
        return result.join('\n');
    }

})(MdAbstract);

module.exports = MdAbstract;

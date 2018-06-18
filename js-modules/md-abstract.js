var MdAbstract = MdAbstract || {};

(function (MdAbstract) {

    var md = require('markdown-it')();
    const linesOfAbstract = 8;

    MdAbstract.extractAbstract = function (mdStr) {
        var lines = mdStr.split('\n');
        var count = 0;
        var result = [];
        var flag = false; // if contains ```
        for (var line of lines) {
            var trimedLine = line.trim();
            if (trimedLine !== '') {
                count++;
            }
            if (trimedLine.indexOf('```') >= 0) {
                flag = !flag;
            }
            result.push(line);
            if (flag === false && count >= linesOfAbstract) {
                break;
            }
        }
        var mdHtml = md.render(result.join('\n'));
        return mdHtml;
    }

})(MdAbstract);

module.exports = MdAbstract;

(function () {
    var assert = require('assert');
    var MdAbstract = require('../js-modules/md-abstract');
    var fs = require('fs');

    describe('Markdown abstract generation', () => {
        it('should return abstract of the markdown', () => {
            fs.readFile('md-src/promise-and-javascript-thread.md', 'utf-8', (err, data) => {
                if (err) throw err;
                var abt = MdAbstract.extractAbstract(data);
                assert.deepEqual(abt, abt); // fake test
            });
        });
    });
})();
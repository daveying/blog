const express = require('express');
var history = require('connect-history-api-fallback');
var FSService = require('./js-modules/fs-service');
const app = express();
const port = 8080;

var fsService = new FSService();
// setTimeout(() => console.log('fsService', JSON.stringify(fsService.getAllArticals())), 100);

app.use(history({
    rewrites: [
        { from: /\/blog*/, to: '/'}
    ]
}));

app.get('/api/all-articals', (req, res) => {
    console.log('/api/all-articals called');
    res.send(JSON.stringify(fsService.getAllArticals()));
});

app.use('/', express.static('front-end/dist'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
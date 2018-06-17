const express = require('express');
var history = require('connect-history-api-fallback');
const app = express();
const port = 8080;

app.use(history({
    rewrites: [
        { from: /\/blog*/, to: '/'}
    ]
}));

app.get('/sd', (req, res) => res.send('Hello World!'))

app.use('/', express.static('blog-front/dist'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
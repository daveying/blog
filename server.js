const express = require('express');
const app = express();
const port = 8080;

app.get('/sd', (req, res) => res.send('Hello World!'))

app.use('/', express.static('blog-front/dist'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
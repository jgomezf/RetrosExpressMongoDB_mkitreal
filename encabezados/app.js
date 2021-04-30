const express = require('express');
const app = express();

app.get('/', (req, res) => {

    res.send(req.get('User-Agent'));
});

app.listen(3000, () => console.log('Listening on  the port 3000'));
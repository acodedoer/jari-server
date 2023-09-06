const express = require('express');

const app = express();

app.get('/sayings', (req, res) => {
    res.send('Da asara gara gidadanci.')
})
app.listen(8080)
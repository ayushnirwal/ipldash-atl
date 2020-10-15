var express = require('express');
var app = express();

app.use('/static', express.static('dist'));

app.listen(3000);
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routeTask = require('./controller/task.controller');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/task', routeTask);
app.use((error, req, res, _next) => res.send(error.message));

module.exports = app;
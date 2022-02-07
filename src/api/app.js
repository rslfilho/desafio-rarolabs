const cors = require('cors');
// const path = require('path');
const express = require('express');
const statusMonitor = require('express-status-monitor');

const root = require('../routers/root');
const { error, swagger, errorLogger } = require('../middlewares');

const app = express();

app.use(cors());
app.use(statusMonitor());

app.use('/swagger', swagger.serve, swagger.setup);
app.use(root);
app.use(errorLogger);
app.use(error);

module.exports = app;

const express = require('express');

const v1Router = require('./versionOne');

const root = express.Router();

root.use('/v1', v1Router);

module.exports = root;

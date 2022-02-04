require('dotenv').config();
const cors = require('cors');
const express = require('express');

const root = require('../routers/root');
const { error } = require('../middlewares');

const { PORT } = process.env;

const app = express();

app.use(cors());

app.use(root);

app.use(error);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

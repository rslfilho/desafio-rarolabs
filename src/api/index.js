require('dotenv').config();
const cors = require('cors');
const express = require('express');

const root = require('../routers/root');
const { error, swagger } = require('../middlewares');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use('/swagger', swagger.serve, swagger.setup);
app.use(root);
app.use(error);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

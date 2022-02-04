require('dotenv').config();
const cors = require('cors');
const express = require('express');

const { PORT } = process.env;

const app = express();

app.use(cors());

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

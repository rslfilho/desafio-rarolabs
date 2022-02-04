const express = require('express');

const paginationController = require('../controllers/pagination');

const router = express.Router();

router.use('/paginacao', paginationController.get);

module.exports = router;

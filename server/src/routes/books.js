const express = require('express');
const router = express.Router();

const infoBooksController = require('../app/controllers/InfoBookController');

router.get('/:slug', infoBooksController.show);

module.exports = router;

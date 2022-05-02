const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const adminController = require('../app/controllers/AdminController');
const homeController = require('../app/controllers/HomeController');

router.post('/login', adminController.login);
router.get('/search', siteController.search);
router.get('/login', siteController.login);
router.get('/', homeController.index);

module.exports = router;

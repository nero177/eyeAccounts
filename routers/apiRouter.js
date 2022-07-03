const { Router } = require('express');
const router = new Router();
const apiController = require('../controllers/ApiController');

router.get('/getAccount', apiController.getAccountInfo)

module.exports = router;
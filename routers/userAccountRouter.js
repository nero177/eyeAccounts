const { Router } = require('express');
const router = new Router();
const authPass = require('../middlewares/authPass');
const loadUser = require('../middlewares/loadUser');

router.get('/', authPass, loadUser)

module.exports = router;
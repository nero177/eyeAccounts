const { Router } = require('express');
const router = new Router();
const adminController = require('../controllers/AdminController');
const adminMiddleware = require('../middlewares/adminMw');
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({ extended: false });

router.get('/', adminMiddleware, (req, res) => { res.render('admin', { accounts: res.locals.accounts }) });
router.get('/login', (req, res) => res.render('adminLogin'))
router.post('/login', urlencoded, adminController.login);
router.post('/addAccount', adminMiddleware, urlencoded, adminController.addAccount)

module.exports = router;
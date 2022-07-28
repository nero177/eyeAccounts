const { Router } = require('express');
const router = new Router();
const adminController = require('../controllers/AdminController');
const adminPass = require('../middlewares/adminPass');
const bodyParser = require('body-parser');
const loadAccounts = require('../middlewares/loadAccounts');
const loadSoldAccounts = require('../middlewares/loadStat')
const urlencoded = bodyParser.urlencoded({ extended: false });

router.get('/', adminPass, loadAccounts, (req, res) => { res.render('admin', { 
    accounts: res.locals.accounts, 
})});
router.get('/stat', adminPass, loadSoldAccounts, (req, res) => {res.render('adminStat', {
    accounts: res.locals.soldAccounts,
    totalSold: res.locals.totalSold,
    totalSoldCount: res.locals.totalSoldCount
})});

router.post('/addAccount', adminPass, urlencoded, adminController.addAccount)

module.exports = router;
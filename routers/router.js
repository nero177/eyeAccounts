const { Router } = require('express');
const router = new Router();
const loadAccounts = require('../middlewares/loadAccounts');
const paymentController = require('../controllers/PaymentController');
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({ extended: false });

router.get('/', loadAccounts, (req, res) => {
    //301 redirects
    if (req.protocol == 'http' && req.get('host') != 'localhost:3000')
        res.redirect(301, 'https://' + req.get('host'))

    if (req.get('host') == 'eyeaccounts.lm.r.appspot.com')
        res.redirect(301, 'https://eyeaccounts.store/');

    res.render('index', { accounts: res.locals.accounts })
});


router.get('/privacy-policy', (req, res) => res.render('privacy-policy'));
router.get('/return-policy', (req, res) => res.render('return-policy'));
router.get('/failed', (req, res) => res.json({ message: 'Ошибка оплаты' }))
router.get('/success', paymentController.success);

router.post('/success', paymentController.success);
router.post('/notification', (req, res) => { console.log(req) });
router.post('/createPayment', urlencoded, paymentController.createPayment);

router.get('*', (req, res) => res.render('404'));

module.exports = router;
const { Router } = require('express');
const router = new Router();
const userController = require('../controllers/UserController');
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({ extended: false });
const { regValidation, loginValidation } = require('../validationArrays');
const loadAccountsMw = require('../middlewares/loadAccountsMw');

router.get('/', loadAccountsMw, (req, res) => {
    //301 redirects
    if (req.protocol == 'http' && req.get('host') != 'localhost:3000')
        res.redirect(301, 'https://' + req.get('host'))

    if (req.get('host') == 'eyeaccounts.lm.r.appspot.com')
        res.redirect(301, 'https://eyeaccounts.store/');

    res.render('index', { accounts: res.locals.accounts })
});

router.get('/reg', (req, res) => res.render('registration'))
router.get('/login', (req, res) => res.render('login'))
router.get('/logout', userController.logout)
router.get('/privacy-policy', (req, res) => res.render('privacy-policy'));
router.get('/return-policy', (req, res) => res.render('return-policy'));
router.get('/notification', (req, res) => res.json({ message: 'Оплата произведена' }))
router.get('/success', (req, res) => res.json({ message: 'Оплата произведена успешно' }))
router.get('/failed', (req, res) => res.json({ message: 'Ошибка оплаты' }))
router.get('*', (req, res) => res.render('404'));

router.post('/reg', regValidation, urlencoded, userController.registration)
router.post('/login', loginValidation, urlencoded, userController.login)

module.exports = router;
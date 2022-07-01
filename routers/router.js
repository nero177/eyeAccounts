const { Router } = require('express');
const router = new Router();
const userController = require('../controllers/UserController');
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({ extended: false });
const { regValidation, loginValidation } = require('../validationArrays');
const loadAccountsMw = require('../middlewares/loadAccountsMw');

router.get('/', loadAccountsMw, (req, res) => res.render('index', { accounts: res.locals.accounts }))
router.get('/reg', (req, res) => res.render('registration'))
router.get('/login', (req, res) => res.render('login'))
router.get('/logout', userController.logout)
router.get('/oplata', (req, res) => res.render('oplata'))
router.get('/notification', (req, res) => res.json({ message: 'Оплата произведена' }))
router.get('/success', (req, res) => res.json({ message: 'Оплата произведена успешно' }))
router.get('/failed', (req, res) => res.json({ message: 'Ошибка оплаты' }))
router.get('*', (req, res) => res.render('404'));

router.post('/reg', regValidation, urlencoded, userController.registration)
router.post('/login', loginValidation, urlencoded, userController.login)
module.exports = router;
const { Router } = require('express')
const router = new Router();
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({ extended: false });
const userController = require('../controllers/UserController');

const { regValidation, loginValidation } = require('../utils/validationArrays');

router.get('/reg', (req, res) => res.render('registration'))
router.get('/login', (req, res) => res.render('login'))
router.get('/logout', userController.logout)

router.post('/reg', regValidation, urlencoded, userController.registration)
router.post('/login', loginValidation, urlencoded, userController.login)

module.exports = router;
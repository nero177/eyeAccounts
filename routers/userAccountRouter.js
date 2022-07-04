const { Router } = require('express');
const router = new Router();
const authMiddleware = require('../middlewares/authMw');
const loadUser = require('../middlewares/loadUserMw');
const avatarUpload = require('../middlewares/avatarUploadMw');
const avatarUploadHandler = require('../middlewares/avatarUploadHandlerMw');
const userController = require('../controllers/UserController');


router.get('/', authMiddleware, loadUser)
router.post('/changeAvatar', authMiddleware, avatarUpload.single('avatar'), avatarUploadHandler);
router.get('/userAvatar', authMiddleware, userController.getUserAvatar);
router.get('/oplata', authMiddleware, (req, res) => res.render('oplata'))

module.exports = router;
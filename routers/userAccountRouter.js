const { Router } = require('express');
const router = new Router();
const authMiddleware = require('../middlewares/authMw');
const loadUser = require('../middlewares/loadUserMw');
const avatarUpload = require('../middlewares/avatarUploadMw');
const avatarUploadHandler = require('../middlewares/avatarUploadHandlerMw');

router.get('/', authMiddleware, loadUser)
router.post('/changeAvatar', authMiddleware, avatarUpload.single('avatar'), avatarUploadHandler);

module.exports = router;
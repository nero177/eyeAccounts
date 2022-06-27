const fileService = require('../services/FileService');

module.exports = async function(req, res, next) {
    try {
        const userData = res.locals.userData;
        const userAvatarFilename = await fileService.loadAvatar(userData.id);

        res.render('userAccount', { userData, userAvatarFilename });
    } catch (err) {
        console.log(err);
        return res.redirect('/login')
    }
}
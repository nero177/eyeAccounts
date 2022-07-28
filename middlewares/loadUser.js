const userService = require('../services/UserService');

module.exports = async function(req, res, next) {
    try {
        const userData = res.locals.userData;
        const user = await userService.getUserInfo(userData.id);

        res.render('userAccount', { user });
    } catch (err) {
        console.log(err);
        return res.redirect('/auth/login')
    }
}
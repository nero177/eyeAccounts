const tokenService = require('../services/TokenService')

module.exports = async function(req, res, next) {
    try {
        const token = req.cookies.userToken;

        if (!token) {
            next('User are not authorized [auth]');
            return res.redirect('/auth/login')
        }

        const decodedData = tokenService.validateToken(token);

        if (!decodedData) {
            next('Invalid token');
            res.redirect('/auth/login')
        }

        res.locals.userData = decodedData;
        next();
    } catch (err) {
        return res.redirect('/auth/login')
    }
}
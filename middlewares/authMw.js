const tokenService = require('../services/TokenService')

module.exports = async function(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            next('User are not authorized [auth]');
            return res.redirect('/login')
        }

        const decodedData = tokenService.validateToken(token);

        if (!decodedData) {
            next('Invalid token');
            res.redirect('/login')
        }

        res.locals.userData = decodedData;

        next();
    } catch (err) {
        return res.redirect('/login')
    }
}
const config = require('../config');
const accountModel = require('../models/Account');

module.exports = async function(req, res, next) {
    if (!config.adminIPs.includes(req.ip))
        return res.redirect('/');

    const accounts = await accountModel.find();
    res.locals.accounts = accounts;

    next();
}
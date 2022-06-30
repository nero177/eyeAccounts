const accountModel = require('../models/Account');
const axios = require('axios').default;

module.exports = async function(req, res, next) {
    try {
        const accounts = await accountModel.find();
        res.locals.accounts = accounts;

        next();
    } catch (err) {
        console.log(err)
        return res.redirect('/');
    }
}
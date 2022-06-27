const path = require('path');
const fs = require('fs');
const config = require('../config');
const accountModel = require('../models/Account');

module.exports = async function(req, res, next) {
    let isAdminAuthorizated;

    try {
        isAdminAuthorizated = fs.readFileSync(path.resolve(process.cwd(), 'isAdminAuthorized.txt'));
    } catch (e) {
        return res.redirect('/admin/login');
    }

    if (isAdminAuthorizated.toString() !== config.adminIP)
        return res.redirect('/admin/login');

    const accounts = await accountModel.find();
    res.locals.accounts = accounts;

    next();
}
const adminModel = require('../models/Admin');
const accountModel = require('../models/Account');
const bcrypt = require('bcrypt');

class AdminService {
    async login(login, password) {
        const admin = await adminModel.findOne({ login });

        if (!admin)
            return null;

        const compare = bcrypt.compareSync(password, admin.password);

        if (!compare)
            return null;

        return admin;
    }

    async addAccount(accountInfo) {
        try {
            const account = await accountModel.create({...accountInfo });
            return account;
        } catch (err) {
            return null;
        }
    }
}

module.exports = new AdminService();
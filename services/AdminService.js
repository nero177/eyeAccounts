const accountModel = require('../models/Account');

class AdminService {
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
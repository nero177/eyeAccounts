const Account = require('../models/Account');

class ApiService {
    async getAccountInfo(accountDescription) {
        try {
            const account = await Account.findOne({ description: accountDescription });
            return account;
        } catch (err) {
            return err;
        }
    }
}

module.exports = new ApiService();
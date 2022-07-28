const Account = require('../models/Account');

class ApiService {
    async getAccountInfo(accountDescription) {
        try {
            const account = await Account.findOne({ description: accountDescription });
            return { price: account.price, description: account.description, amount: account.amount };
        } catch (err) {
            return err;
        }
    }
}

module.exports = new ApiService();
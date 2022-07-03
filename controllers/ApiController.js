const apiService = require('../services/ApiService');
const md5 = require('md5');
const config = require('../config');

class ApiController {
    async getAccountInfo(req, res) {
        const account = await apiService.getAccountInfo(req.query["description"]);
        const shop = req.query["shop"];
        const payment = md5(account.description).substr(0, 14);

        const signParameters = [
            account.price,
            payment,
            shop,
            'RUB',
            req.query["description"],
            config.payokSecret
        ];

        const sign = md5(signParameters.join('|'));
        return res.json({ description: account.description, price: account.price, payment, sign });
    }
}

module.exports = new ApiController;
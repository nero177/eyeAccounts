const apiService = require('../services/ApiService');
const md5 = require('md5');
const config = require('../config');

class ApiController {
    async getAccountInfo(req, res) {
        const account = await apiService.getAccountInfo(req.query["description"]); //find acc by description
        const orderID = md5(account.description).substr(0, 14); //generate order id

        const signParameters = [
            '19327',
            account.price,
            'Z3>u1e..?{%K=%1',
            'RUB',
            orderID
        ];

        const sign = md5(signParameters.join(':')); //generate sign
        return res.json({ description: account.description, price: account.price, sign, orderID });
    }
}

module.exports = new ApiController;
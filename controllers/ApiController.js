const apiService = require('../services/ApiService');

class ApiController {
    async getAccountInfo(req, res) {
        try {
            const account = await apiService.getAccountInfo(req.query["description"]); //find acc by description
            return res.json({ description: account.description, price: account.price, amount: account.amount });
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new ApiController;
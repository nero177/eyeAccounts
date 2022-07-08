const apiService = require('../services/ApiService');

class ApiController {
    async getAccountInfo(req, res) {
        try {
            const account = await apiService.getAccountInfo(req.query["description"]); //find acc by description
            // const orderID = md5(account.description).substr(0, 14); //generate order id

            // let signParameters = [
            //     account.price,
            //     '62c7f1d7546739750e0126e5',
            //     account.description,
            //     'RUB',
            //     orderID,
            // ];
            // signParameters = signParameters.sort();
            // signParameters.push('7AknbviidJY8uI7z');

            // let signString = signParameters.join(':');
            // let sign = md5(signString, );


            // console.log(sign)
            return res.json({ description: account.description, price: account.price, /* orderID*/ });
        } catch (err) {
            console.log(err)
        }

    }
}

module.exports = new ApiController;
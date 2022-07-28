const apiService = require('../services/ApiService');
require('dotenv').config();
const md5 = require('md5');
const uuid = require('uuid');
const paymentService = require('../services/PaymentService');

class PaymentController {
    async success(req, res) {
        console.log(req.query)
        console.log(req.query.payment_id);
        console.log(req.query.currency_amount);

        if (req.headers.referer != 'https://payok.io/')
            return res.json({ message: 'Вы ошиблись адресом :(' })

        try {
            await paymentService.proceedPayment(req.cookies.accountDescription, req.cookies.email, req.cookies.count);

            res.clearCookie('token');
            res.clearCookie('count');
            res.clearCookie('payment');

            return res.status(200).render('success');
        } catch (err) {
            return res.send('У вас почти все получилось: ' + err);
        }
    }

    async createPayment(req, res) {
        const accountInfo = await apiService.getAccountInfo(req.body.description);
        const newPaymentId = uuid.v4().slice(0, 16); //generate new paymentId
        const totalPrice = accountInfo.price * parseInt(req.body.count)
        const signParams = [
            totalPrice,
            newPaymentId,
            '1935',
            'RUB',
            accountInfo.description,
            process.env.PAYOK_SECRET
        ];

        const sign = md5(signParams.join('|'));
        res.cookie('accountDescription', accountInfo.description, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true });
        return res.json({ paymentId: newPaymentId, sign, amount: totalPrice });
    }
}

module.exports = new PaymentController();
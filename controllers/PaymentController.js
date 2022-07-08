class PaymentController {
    async success(req, res) {
        const authorization = JSON.parse(req.headers.authorization);
        console.log(authorization)
        console.log(JSON.parse(authorization.signedMessage))
        res.redirect('/success')
    }
}

module.exports = new PaymentController();
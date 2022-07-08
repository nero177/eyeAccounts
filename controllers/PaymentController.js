class PaymentController {
    async success(req, res) {
        console.log('success')
        res.redirect('/success')
    }
}

module.exports = new PaymentController();
const adminService = require('../services/AdminService');

class AdminController {
    async addAccount(req, res) {
        const accInfo = {
            social: req.body['social-name'],
            description: req.body['account-description'.replace(/\s{2,}/g, '')].trim(),
            price: req.body.price,
            data: JSON.parse(req.body['accounts-data-hidden']),
            amount: req.body['accounts-count-hidden']
        }

        const account = await adminService.addAccount(accInfo);

        if (!account)
            return res.json({ message: 'cannot post account' });

        return res.redirect('/admin');
    }
}

module.exports = new AdminController();
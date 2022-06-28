const adminService = require('../services/AdminService');

class AdminController {
    async login(req, res) {
        const { login, password } = req.body;
        const admin = await adminService.login(login, password);

        if (!admin)
            return res.json({ message: 'admin auth error' });

        res.redirect('/admin');
    }

    async addAccount(req, res) {
        const accInfo = {
            social: req.body['social-name'],
            description: req.body['account-description'],
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
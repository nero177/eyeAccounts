const adminService = require('../services/AdminService');
const path = require('path');
const fs = require('fs');

class AdminController {
    async login(req, res) {
        const { login, password } = req.body;
        const admin = await adminService.login(login, password);

        if (!admin)
            return res.json({ message: 'admin auth error' });

        fs.writeFile(path.resolve(process.cwd(), 'isAdminAuthorized.txt'), req.ip, function(err) {
            if (err) {
                return res.json({ err })
            }

            setTimeout(() => {
                    fs.unlink(path.resolve(process.cwd(), 'isAdminAuthorizated.txt'), err => {
                        if (err)
                            console.log('deleting file error');
                    });
                }, 1 * 60 * 60 * 1000) //delete after one hour
        });


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
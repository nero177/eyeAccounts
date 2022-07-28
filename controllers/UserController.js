const userService = require('../services/UserService');
const { validationResult } = require('express-validator');

class UserController {
    async registration(req, res) {
        const { email, login, password } = req.body;
        const errors = validationResult(req.body);

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(401).render('registration', { error: 'Данные введены некорректно' });
        }

        const userData = await userService.registration(login, email, password);

        if (userData.error) {
            switch (userData.error) {
                case 'Login exist':
                    return res.status(401).render('registration', { error: 'Такой пользователь уже существует :0' });
                case 'Email exist':
                    return res.status(401).render('registration', { error: 'Пользователь с такой почтой уже существует' });
            }
        }

        res.cookie('userToken', userData.token, { maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true }); //set cookie for 14 days
        res.redirect('/auth/login');
    }

    async login(req, res) {
        const { login, password } = req.body;
        const errors = validationResult(req.body);

        if (!errors.isEmpty()) {
            return res.status(401).render('login', { error: 'Данные введены некорректно :(' });
        }

        const userData = await userService.login(login, password);

        if (userData.error) {
            switch (userData.error) {
                case 'Incorrect password':
                    return res.status(401).render('login', { error: 'Неправильный пароль' });
                case 'Incorrect login':
                    return res.status(401).render('login', { error: 'Неправильный логин' });
            }
        }

        res.cookie('userToken', userData.token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.redirect('/userAccount');
    }
    async logout(req, res) {
        const logoutResponse = await userService.logout(req.cookies.userToken);

        if (!logoutResponse) {
            return res.status(401).json({ message: 'user are not authorized [logout]' })
        }

        res.clearCookie('userToken');
        res.redirect('/auth/login')
    }

    async getUserAvatar(req, res) {
        const userAvatar = await userService.getUserAvatar(res.locals.userData.id)
        return res.json({ userAvatar })
    }
}

module.exports = new UserController();
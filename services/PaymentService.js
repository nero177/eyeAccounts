const Account = require('../models/Account');
const mailer = require('../utils/nodemailer');
const SoldAccount = require('../models/SoldAccount');

class PaymentService {
    async proceedPayment(accountDescription, email, choosenAmount) {
        const accountData = await Account.findOne({ description: accountDescription }); //find account by payment id
        const choosenAmountInt = parseInt(choosenAmount);

        let receiver = email;
        let message = '';

        if (choosenAmountInt == 1) {
            message = {
                to: receiver,
                subject: 'Оплата прошла успешно :)',
                html: `
                <h1 style="color: purple; text-align: center;">EyeAccounts</h1>
                <p style="text-align: center;"> Поздравляем! Вот данные от купленного аккаунта: </p>
                <a href="${accountData.data[0]}" target="_blank">${accountData.data[0]}</a>
                `
            }
        } else {
            const severalAccountsData = [];

            for (let i = 0; i < choosenAmountInt; i++) {
                severalAccountsData.push(`<a href="${accountData.data[i]}">` + accountData.data[i] + "</a><br>");
            }

            const severalAccountsDataString = severalAccountsData.join('')

            message = {
                to: receiver,
                subject: 'Оплата прошла успешно :)',
                html: `
                <h1 style="color: purple; text-align: center;">EyeAccounts</h1>
                <p style="text-align: center;"> Поздравляем! Вот данные от купленных аккаунтов </p>
                <b style="color: red; text-align: center;">ВНИМАНИЕ! Аккаунты удалятся с диска через один день. Успейте скачать до этого времени.</b><br>
                ${severalAccountsDataString}
                `
            }
        }

        const soldAccount = {
            social: accountData.social,
            description: accountData.description,
            price: accountData.price,
            amount: choosenAmountInt,
        }

        await SoldAccount.create(soldAccount);

        accountData.data.splice(0, choosenAmount); //delete selled account data
        accountData.amount -= parseInt(choosenAmount); //decrease amount

        mailer(message)

        if (accountData.amount <= 0) {
            accountData.deleteOne(); //delete account model if there is no more data
            return;
        }

        accountData.save(); //save changes in account model
        return accountData.data[0];
    }
}

module.exports = new PaymentService();
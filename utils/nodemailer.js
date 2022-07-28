const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'eyeshopassist@gmail.com',
        pass: 'oisvstkqgqwshyph'
    }
}, {
    from: 'Eye Accounts <EyeShopAssist@gmail.com>',
})

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.error(err);
    })
}

module.exports = mailer;
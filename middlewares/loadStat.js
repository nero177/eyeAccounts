const SoldAccount = require('../models/SoldAccount')

module.exports = async function (req, res, next) {
    const soldAccounts = await SoldAccount.find();
    res.locals.soldAccounts = soldAccounts;

    let totalPrice = 0;
    let totalSoldCount = 0;

    soldAccounts.map(account => {
        totalPrice += parseInt(account.price);
        totalSoldCount += account.amount;
    })

    res.locals.totalSold = totalPrice;
    res.locals.totalSoldCount = totalSoldCount;
    next();
}
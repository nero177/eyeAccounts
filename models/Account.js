const { Schema, model } = require('mongoose');

const Account = new Schema({
    social: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    data: [{ type: String, required: true }],
    amount: { type: Number, required: true }
})

module.exports = model('Account', Account)
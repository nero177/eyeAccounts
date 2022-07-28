const { Schema, model } = require('mongoose');

const User = new Schema({
    email: { type: String, unique: true, required: true },
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    xp: { type: Number, required: true, default: 0 },
    lvl: { type: Number, required: true, default: 1 },
    rank: { type: String, required: true, default: 'Jabroni' }
})

module.exports = model('User', User);
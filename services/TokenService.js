const jwt = require('jsonwebtoken');
const config = require('../config.js');
const Token = require('../models/Token');
const tokenModel = require('../models/Token');

class TokenService {
    generateToken(payload) {
        const token = jwt.sign(payload, config.jwtAccess, { expiresIn: '1h' });
        return token;
    }

    validateToken(token) {
        try {
            const userData = jwt.verify(token, config.jwtAccess);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, token) {
        const tokenData = await tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.token = token;
            return tokenData.save();
        }

        const newToken = await tokenModel.create({ user: userId, token })
        return newToken;
    }

    async removeToken(token) {
        try {
            return await Token.deleteOne({ token });
        } catch (err) {
            throw new Error(err);
        }
    }
    async findToken(token) {
        try {
            return await Token.findOne({ token });
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = new TokenService();
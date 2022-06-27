const { body } = require('express-validator');

const regValidation = [
    body('email').isEmail().trim(),
    body('login').isLength({ min: 4, max: 20 }).trim(),
    body('password').isLength({ min: 6, max: 16 }).trim()
]

const loginValidation = [
    body('login').isLength({ min: 4, max: 20 }).trim(),
    body('password').isLength({ min: 6, max: 16 }).trim()
]

module.exports = { regValidation, loginValidation };
const User = require('../models/User');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/UserDto');
const tokenService = require('./TokenService');

class UserService {
    async registration(login, email, password) {
        try {
            const uniqueLoginCheck = await User.findOne({ login });
            const uniqueEmailCheck = await User.findOne({ email });
            let error;

            if (uniqueLoginCheck) {
                error = 'Login exist';
                return { error }
            }

            if (uniqueEmailCheck) {
                error = 'Email exist';
                return { error }
            }

            const hashPass = bcrypt.hashSync(password, 8);
            const newUser = await User.create({
                email,
                login,
                password: hashPass
            });
            const userDto = new UserDto(newUser);
            const token = tokenService.generateToken({...userDto });
            await tokenService.saveToken(userDto.id, token);

            return { userDto, token }
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    async login(login, password) {
        try {
            const user = await User.findOne({ login });
            let error;

            if (!user) {
                error = 'Incorrect login';
                return { error };
            }

            const comparePass = bcrypt.compareSync(password, user.password);

            if (!comparePass) {
                error = 'Incorrect password';
                return { error };
            }

            const userDto = new UserDto(user);
            const token = tokenService.generateToken({...userDto });
            await tokenService.saveToken(userDto.id, token);
            return { userDto, token }
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    async logout(token) {
        try {
            const removedToken = await tokenService.removeToken(token);
            return removedToken;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getUserInfo(id) { //data (email, login or id)
        const user = await User.findOne({ id: id });
        const userDTO = new UserDto(user);
        return { userDTO }
    }
}

module.exports = new UserService();
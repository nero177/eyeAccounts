module.exports = class UserDto {
    email;
    login;
    id;
    constructor(model) {
        this.email = model.email;
        this.login = model.login;
        this.id = model._id;
    }
}
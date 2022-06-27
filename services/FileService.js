const Avatar = require('../models/Avatar')

class FileService {
    async loadAvatar(userId) {
        const userAvatar = await Avatar.findOne({ avatarUserId: userId });
        let userAvatarFilename;

        if (!userAvatar) {
            userAvatarFilename = 'img/default-avatar.jpeg';
        } else {
            userAvatarFilename = userAvatar.name;
        }

        return userAvatarFilename;
    }
}

module.exports = new FileService();
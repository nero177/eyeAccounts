const Avatar = require('../models/Avatar')

class FileService {
    async loadAvatar(userId) {
        const userAvatar = await Avatar.findOne({ avatarUserId: userId });
        let userAvatarFilename;

        if (!userAvatar) {
            userAvatarFilename = 'img/default-avatar.jpeg';
        } else {
            userAvatarFilename = `data:image/${userAvatar.img.contentType};base64,${userAvatar.img.data.toString('base64')}`;
        }

        return userAvatarFilename;
    }
}

module.exports = new FileService();
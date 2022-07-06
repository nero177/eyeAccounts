const Avatar = require('../models/Avatar');
const fs = require('fs');
const path = require('path');

module.exports = async function(req, res, next) {
    if (!req.file)
        return new Error('no uploaded image');

    try {
        const userData = res.locals.userData;
        const isAlreadyUploaded = await Avatar.findOne({ avatarUserId: userData.id })

        if (isAlreadyUploaded)
            await Avatar.deleteMany({ avatarUserId: userData.id })

        const newAvatar = await Avatar.create({
            name: req.file.filename,
            avatarUserId: userData.id,
            img: {
                data: fs.readFileSync(path.resolve(process.cwd(), 'tmp', req.file.filename)),
                contentType: 'image/png'
            }
        });

        res.redirect('/userAccount')
    } catch (err) {
        next(err);
    }
}
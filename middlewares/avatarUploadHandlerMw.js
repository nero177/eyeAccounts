const Avatar = require('../models/Avatar');

module.exports = async function(req, res, next) {
    if (!req.file)
        return new Error('no uploaded image');

    try {
        const userData = res.locals.userData;
        const isAlreadyUploaded = await Avatar.findOne({ avatarUserId: userData.id })

        if (isAlreadyUploaded)
            await Avatar.deleteMany({ avatarUserId: userData.id })

        await Avatar.create({
            name: req.file.filename,
            avatarUserId: userData.id
        });

        res.redirect('/userAccount')
    } catch (err) {
        next(err);
    }
}
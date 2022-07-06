const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tmp')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.originalname}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === 'png' || file.mimetype.split('/')[1] === 'jpeg') {
        cb(null, true)
    } else {
        cb(new Error('Image extencion can be only png or jpg'), false);
    }
}

module.exports = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
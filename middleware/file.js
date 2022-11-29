const multer = require('multer');

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
      cb(null, 'public/books')
    },
    filename(_req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = multer({storage})
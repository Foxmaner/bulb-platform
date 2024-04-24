import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../public/uploaded_images')
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName)
    }
})
  
const upload = multer({
    storage: storage,
    limits: { fileSize: process.env.FILE_SIZE }
})

export { upload };
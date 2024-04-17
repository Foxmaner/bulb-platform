import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../public/uploaded_images')
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "_" + file.fieldname;
        cb(null, uniqueName)
    }
})
  
const upload = multer({ storage: storage })

export { upload };
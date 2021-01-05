const express = require('express');
const router = new express.Router();

const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },

    filename(req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
        // or `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    }
})


const multerFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
        return cb(new Error("File format not supported!"))
    }

    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new Error("File format not supported! Please upload an image."))
    }
}


const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})


router.post("/", upload.single("image"), (req, res) => {
    res.json({path: req.file.path});
})


module.exports = router;
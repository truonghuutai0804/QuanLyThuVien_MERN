const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/upload/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
const upload = multer({ storage: storage });

const bookController = require('../../app/controllers/BookController');

router.post('/stored', upload.single('imageBook'), bookController.store);
router.get('/create', bookController.create);
router.get('/:id/edit', bookController.edit);
router.put('/:id', upload.single('imageBook'), bookController.update);
router.delete('/:id', bookController.destroy);

module.exports = router;

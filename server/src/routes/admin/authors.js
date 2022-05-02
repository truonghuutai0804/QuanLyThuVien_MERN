const express = require('express');
const router = express.Router();

const authorController = require('../../app/controllers/AuthorController');
//AUTHORS
router.post('/stored', authorController.storeAuthor);
router.get('/create', authorController.createAuthor);
router.get('/:id/edit', authorController.editAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.destroyAuthor);

module.exports = router;

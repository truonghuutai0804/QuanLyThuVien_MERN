const express = require('express');
const router = express.Router();

const categotyController = require('../../app/controllers/CategoryController');

//CATEGORIES
router.post('/stored', categotyController.storeCategory);
router.get('/create', categotyController.createCategory);
router.get('/:id/edit', categotyController.editCategory);
router.put('/:id', categotyController.updateCategory);
router.delete('/:id', categotyController.destroyCategory);

module.exports = router;

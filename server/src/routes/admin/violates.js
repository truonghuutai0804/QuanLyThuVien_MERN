const express = require('express');
const router = express.Router();

const violateController = require('../../app/controllers/ViolateController');
//VIOLATES
router.post('/stored', violateController.stored);
router.get('/create', violateController.create);
router.get('/:id/edit', violateController.edit);
router.put('/:id', violateController.update);
router.delete('/:id', violateController.destroy);

module.exports = router;

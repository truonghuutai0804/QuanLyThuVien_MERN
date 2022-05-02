const express = require('express');
const router = express.Router();

const borrowController = require('../../app/controllers/BorrowController');
//STAFFS
router.post('/stored', borrowController.storeBorrows);
router.get('/create', borrowController.createBorrows);
router.get('/:id/edit', borrowController.editBorrows);
router.put('/:id', borrowController.updateBorrows);
// router.delete('/:id', borrowController.destroyBorrows);

module.exports = router;

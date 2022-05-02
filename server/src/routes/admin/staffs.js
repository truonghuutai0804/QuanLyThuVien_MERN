const express = require('express');
const router = express.Router();

const staffController = require('../../app/controllers/StaffController');
//STAFFS
router.post('/stored', staffController.storeStaffs);
router.get('/create', staffController.createStaffs);
router.get('/:id/edit', staffController.editStaffs);
router.put('/:id', staffController.updateStaffs);
router.delete('/:id', staffController.destroyStaffs);

module.exports = router;

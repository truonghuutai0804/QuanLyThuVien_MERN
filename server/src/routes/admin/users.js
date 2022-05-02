const express = require('express');
const router = express.Router();

const userController = require('../../app/controllers/UserController');
//STAFFS
router.post('/stored', userController.storeUsers);
router.get('/create', userController.createUsers);
router.get('/:id/edit', userController.editUsers);
router.get('/:id/violate', userController.violateUsers);
router.put('/:id', userController.updateUsers);
router.delete('/:id', userController.destroyUsers);

module.exports = router;

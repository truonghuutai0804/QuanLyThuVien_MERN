const express = require('express');
const router = express.Router();

const publisherController = require('../../app/controllers/PublisherController');

//PUBLISHERS
router.post('/stored', publisherController.storePublishers);
router.get('/create', publisherController.createPublishers);
router.get('/:id/edit', publisherController.editPublishers);
router.put('/:id', publisherController.updatePublishers);
router.delete('/:id', publisherController.destroyPublishers);

module.exports = router;

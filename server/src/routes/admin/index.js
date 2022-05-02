const express = require('express');
const router = express.Router();
const adminController = require('../../app/controllers/AdminController');

const booksRouter = require('./books');
const authorsRouter = require('./authors');
const categoriesRouter = require('./categories');
const publishersRouter = require('./publishers');
const staffsRouter = require('./staffs');
const usersRouter = require('./users');
const borrowsRouter = require('./borrows');
const violatesRouter = require('./violates');

router.use('/books', booksRouter);
router.use('/authors', authorsRouter);
router.use('/categories', categoriesRouter);
router.use('/publishers', publishersRouter);
router.use('/staffs', staffsRouter);
router.use('/users', usersRouter);
router.use('/borrows', borrowsRouter);
router.use('/violates', violatesRouter);

router.get('/stored/violates', adminController.storedViolates);
router.get('/stored/borrows', adminController.storedBorrows);
router.get('/stored/users', adminController.storedUsers);
router.get('/stored/staffs', adminController.storedStaffs);
router.get('/stored/publishers', adminController.storedPublishers);
router.get('/stored/categories', adminController.storedCategories);
router.get('/stored/authors', adminController.storedAuthors);
router.get('/stored/books', adminController.stored);
router.get('/', adminController.storedBorrows);

module.exports = router;

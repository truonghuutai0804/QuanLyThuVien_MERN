const Book = require('../models/Book');
const Category = require('../models/Category');
const Author = require('../models/Author');
const Publisher = require('../models/Publisher');
const Staff = require('../models/Staff');
const User = require('../models/User');
const Borrow = require('../models/Borrow');
const Account = require('../models/Account');
const Violate = require('../models/Violate');

const bcrypt = require('bcrypt');

const { multipleMongooseToObject } = require('../../util/mongoose');

var session;

class AdminContoller {
    //BOOKS
    //GET admin/stored/books
    stored(req, res, next) {
        Book.find({})
            .populate({ modal: 'Category', path: 'categoryBook' })
            .populate({ modal: 'Author', path: 'authorBook' })
            .populate({ modal: 'Publisher', path: 'publisherBook' })
            .then((books) => {
                res.status(200).json({
                    status: 'success',
                    results: books.lenght,
                    data: { books }
                });
            })
            .catch(next);
    }

    //AUTHORS
    //GET admin/stored/authors
    storedAuthors(req, res, next) {
        Author.find({})
            .populate({ modal: 'Book', path: 'owner' })
            .then((authors) => {
                // res.json(authors)
                res.render('admin/stored-authors', {
                    authors: multipleMongooseToObject(authors),
                    layout: 'admin',
                });
            })
            .catch(next);
    }

    //CATEGORY
    //GET admin/stored/categories
    storedCategories(req, res, next) {
        Category.find({})
            .then((categories) => {
                // res.json(authors)
                res.render('admin/stored-categories', {
                    categories: multipleMongooseToObject(categories),
                    layout: 'admin',
                });
            })
            .catch(next);
    }

    //PUBLISHER
    //GET admin/stored/publishers
    storedPublishers(req, res, next) {
        Publisher.find({})
            .populate({ modal: 'Book', path: 'bookPublisher' })
            .then((publishers) => {
                res.render('admin/stored-publishers', {
                    publishers: multipleMongooseToObject(publishers),
                    layout: 'admin',
                });
            })
            .catch(next);
    }

    //STAFFS
    //GET admin/stored/staffs
    storedStaffs(req, res, next) {
        Staff.find({})
            .then((staffs) => {
                res.render('admin/stored-staffs', {
                    staffs: multipleMongooseToObject(staffs),
                    layout: 'admin',
                });
            })
            .catch(next);
    }

    //USERS
    //GET admin/stored/users
    storedUsers(req, res, next) {
        User.find({})
            .then((users) => {
                res.render('admin/stored-users', {
                    users: multipleMongooseToObject(users),
                    layout: 'admin',
                });
            })
            .catch(next);
    }

    //BORROWS
    //GET admin/stored/borrows
    storedBorrows(req, res, next) {
        Borrow.find({})
            .populate({ modal: 'User', path: 'userBorrow' })
            .populate({ modal: 'Staff', path: 'staffBorrow' })
            .populate({ modal: 'Book', path: 'bookBorrow' })
            .then((borrows) => {
                res.render('admin/stored-borrows', {
                    borrows: multipleMongooseToObject(borrows),
                    layout: 'admin',
                });
            })
            .catch(next);
    }
    //VIOLATES
    //GET admin/stored/violate
    storedViolates(req, res, next) {
        Violate.find({}).then((violates) => {
            res.render('admin/stored-violates', {
                violates: multipleMongooseToObject(violates),
                layout: 'admin',
            });
        });
    }

    //LOGIN <AJAX>
    login(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        if (username != '' || password != '') {
            Account.findOne({ username: username })
                .then((account) => {
                    const hash = account.password;
                    const match = bcrypt.compareSync(password, hash);
                    if (match) {
                        session = req.session;
                        session.userid = req.body.username;
                        if (
                            account.role === 'ADMIN' ||
                            account.role === 'STAFF'
                        ) {
                            res.send('ADMIN');
                        } else res.send('USER');
                    } else {
                        res.send('WP');
                    }
                })
                .catch((err) => {
                    res.send('ERR');
                });
        }
    }
}

module.exports = new AdminContoller();

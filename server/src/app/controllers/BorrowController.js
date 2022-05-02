const Book = require('../models/Book');
const User = require('../models/User');
const Borrow = require('../models/Borrow');

const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class BorrowController {
    //BORROWS

    //GET admin/borrows/create
    async createBorrows(req, res, next) {
        let users = await User.find({}).then().catch(next);

        let books = await Book.find({}).then().catch(next);

        res.render('borrows/create', {
            users: multipleMongooseToObject(users),
            books: multipleMongooseToObject(books),
            layout: 'admin',
        });
    }

    //POST admin/borrows/stored
    storeBorrows(req, res, next) {
        var listbook;
        if (req.body.Borrow1 != ' ') {
            listbook = [req.body.bookBorrow, req.body.bookBorrow1];
        } else if (req.body.bookBorrow2 != ' ') {
            listbook = [
                req.body.bookBorrow,
                req.body.bookBorrow1,
                req.body.bookBorrow2,
            ];
        } else {
            listbook = [req.body.bookBorrow];
        }
        var borrowNew = {
            userBorrow: req.body.userBorrow,
            bookBorrow: listbook,
            appointmentDate: req.body.appointmentDate,
        };
        const borrow = new Borrow(borrowNew);
        borrow
            .save()
            .then(() => {
                res.redirect('/admin/stored/borrows');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //GET admin/borrows/:id/edit
    editBorrows(req, res, next) {
        Borrow.findById({ _id: req.params.id })
            .populate({ modal: 'User', path: 'userBorrow' })
            .populate({ modal: 'Staff', path: 'staffBorrow' })
            .populate({ modal: 'Book', path: 'bookBorrow' })
            .then((borrow) => {
                res.render('borrows/edit', {
                    borrow: mongooseToObject(borrow),
                    layout: 'admin',
                });
            })
            .catch(next);
    }

    //PUT admin/borrows/:id
    updateBorrows(req, res, next) {
        Borrow.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/admin/stored/borrows');
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = new BorrowController();

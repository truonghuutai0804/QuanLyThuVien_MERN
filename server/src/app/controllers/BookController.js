const Book = require('../models/Book');
const Category = require('../models/Category');
const Author = require('../models/Author');
const Publisher = require('../models/Publisher');
const fs = require('fs');

const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class BookController {
    //BOOKS

    //GET admin/books/create
    async create(req, res, next) {
        let categories = await Category.find({}).then().catch(next);

        let authors = await Author.find({}).then().catch(next);

        let publishers = await Publisher.find({}).then().catch(next);

        res.render('books/create', {
            categories: multipleMongooseToObject(categories),
            authors: multipleMongooseToObject(authors),
            publishers: multipleMongooseToObject(publishers),
            layout: 'admin',
        });
    }

    //GET admin/books/:id/edit
    async edit(req, res, next) {
        let categories = await Category.find({}).then().catch(next);

        let authors = await Author.find({}).then().catch(next);

        let publishers = await Publisher.find({}).then().catch(next);
        let book = await Book.findById(req.params.id)
            .populate({ modal: 'Category', path: 'categoryBook' })
            .populate({ modal: 'Author', path: 'authorBook' })
            .populate({ modal: 'Publisher', path: 'publisherBook' })
            .then()
            .catch(next);

        res.render('books/edit', {
            categories: multipleMongooseToObject(categories),
            authors: multipleMongooseToObject(authors),
            publishers: multipleMongooseToObject(publishers),
            book: mongooseToObject(book),
            layout: 'admin',
        });
    }

    //POST /admin/books/stored
    store(req, res, next) {
        var imageT = ' ';
        try {
            imageT = req.file.filename;
        } catch (next) {}
        const bookNew = {
            nameBook: req.body.nameBook,
            descriptionBook: req.body.descriptionBook,
            imageBook: imageT,
            yearPublisherBook: req.body.yearPublisherBook,
            categoryBook: req.body.categoryBook,
            authorBook: req.body.authorBook,
            publisherBook: req.body.publisherBook,
        };
        const book = new Book(bookNew);
        book.save().catch((error) => {
            console.log(error);
        });
        Author.updateOne(
            { _id: req.body.authorBook },
            { $push: { owner: book._id } },
        )
            .then()
            .catch(next);
        Category.updateOne(
            { _id: req.body.categoryBook },
            { $push: { bookCategory: book._id } },
        )
            .then()
            .catch(next);
        Publisher.updateOne(
            { _id: req.body.publisherBook },
            { $push: { bookPublisher: book._id } },
        )
            .then(() => res.redirect('/admin/stored/books'))
            .catch(next);
    }

    //PUT admin/books/:id
    async update(req, res, next) {
        let bookOld = await Book.findById({ _id: req.params.id })
            .then()
            .catch(next);
        try {
            if (req.file.filename != bookOld.imageBook) {
                fs.unlink(
                    'src/public/upload/' + bookOld.imageBook,
                    (err) => {},
                );
                Book.updateOne(
                    { _id: req.params.id },
                    { imageBook: req.file.filename },
                )
                    .then()
                    .catch(next);
            }
        } catch (next) {}

        Book.updateOne({ _id: req.params.id }, req.body).then().catch(next);
        Author.updateOne(
            { _id: bookOld.authorBook },
            { $pull: { owner: bookOld._id } },
        )
            .then()
            .catch(next);
        Category.updateOne(
            { _id: bookOld.categoryBook },
            { $pull: { bookCategory: bookOld._id } },
        )
            .then()
            .catch(next);
        Publisher.updateOne(
            { _id: bookOld.publisherBook },
            { $pull: { bookPublisher: bookOld._id } },
        )
            .then()
            .catch(next);

        let bookNew = await Book.findById({ _id: req.params.id })
            .then()
            .catch(next);

        Author.updateOne(
            { _id: req.body.authorBook },
            { $push: { owner: bookNew._id } },
        )
            .then()
            .catch(next);
        Category.updateOne(
            { _id: req.body.categoryBook },
            { $push: { bookCategory: bookNew._id } },
        )
            .then()
            .catch(next);
        Publisher.updateOne(
            { _id: req.body.publisherBook },
            { $push: { bookPublisher: bookNew._id } },
        )
            .then(() => res.redirect('/admin/stored/books'))
            .catch(next);
    }

    //DELETE admin/books/:id
    async destroy(req, res, next) {
        let book = await Book.findById({ _id: req.params.id })
            .then()
            .catch(next);
        Book.deleteOne({ _id: req.params.id })
            .then(() => {
                fs.unlink('src/public/upload/' + book.imageBook, (err) => {
                    if (err) console.log(err);
                });
            })
            .catch(next);
        Author.updateOne(
            { _id: book.authorBook },
            { $pull: { owner: book._id } },
        )
            .then()
            .catch(next);
        Category.updateOne(
            { _id: book.categoryBook },
            { $pull: { bookCategory: book._id } },
        )
            .then()
            .catch(next);
        Publisher.updateOne(
            { _id: book.publisherBook },
            { $pull: { bookPublisher: book._id } },
        )
            .then()
            .catch(next);
    }
}

module.exports = new BookController();

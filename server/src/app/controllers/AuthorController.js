const Author = require('../models/Author');

const { mongooseToObject } = require('../../util/mongoose');

class AuthorController {
    //AUTHORS

    //GET admin/authors/create
    createAuthor(req, res, next) {
        res.render('authors/create', {
            layout: 'admin',
        });
    }
    //POST /admin/books/stored
    storeAuthor(req, res, next) {
        const author = new Author(req.body);
        author
            .save()
            .then(() => res.redirect('/admin/stored/authors'))
            .catch((error) => {
                console.log(error);
            });
    }

    //GET admin/authors/:id/edit
    editAuthor(req, res, next) {
        Author.findById(req.params.id)
            .then((author) =>
                res.render('authors/edit', {
                    author: mongooseToObject(author),
                    layout: 'admin',
                }),
            )
            .catch(next);
    }

    //PUT admin/authors/:id
    updateAuthor(req, res, next) {
        Author.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/stored/authors'))
            .catch((error) => {
                console.log(error);
            });
    }

    //DELETE admin/authors/:id <AJAX>
    async destroyAuthor(req, res, next) {
        let author = await Author.findById({ _id: req.params.id })
            .then()
            .catch(next);
        if (author.owner.length == 0) {
            Author.deleteOne({ _id: req.params.id })
                .then(() => {
                    res.send('SuccessDelete');
                })
                .catch(next);
        } else {
            res.send('NoDelete');
        }
    }
}

module.exports = new AuthorController();

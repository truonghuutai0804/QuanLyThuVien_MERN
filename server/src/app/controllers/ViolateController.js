const Violate = require('../models/Violate');

const { mongooseToObject } = require('../../util/mongoose');

class UserController {
    //VIOLATES

    //GET admin/violates/create
    create(req, res, next) {
        res.render('violates/create', {
            layout: 'admin',
        });
    }

    //POST admin/violates/stored
    stored(req, res, next) {
        const violate = new Violate(req.body);
        violate
            .save()
            .then(() => {
                res.redirect('/admin/stored/violates');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //GET admin/users/:id/edit
    edit(req, res, next) {
        Violate.findById({ _id: req.params.id })
            .then((violate) => {
                res.render('violates/edit', {
                    violate: mongooseToObject(violate),
                    layout: 'admin',
                });
            })
            .catch(next);
    }

    //PUT admin/users/:id
    update(req, res, next) {
        Violate.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/admin/stored/violates');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //DELETE admin/users/:id
    destroy(req, res, next) {
        Violate.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
}

module.exports = new UserController();

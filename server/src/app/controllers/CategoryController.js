const Category = require('../models/Category');

const { mongooseToObject } = require('../../util/mongoose');

class CategoryController {
    //CATEGORY

    //GET admin/categories/create
    createCategory(req, res, next) {
        res.render('categories/create', {
            layout: 'admin',
        });
    }

    //POST admin/categories/stored
    storeCategory(req, res, next) {
        const category = new Category(req.body);
        category
            .save()
            .then(() => {
                res.redirect('/admin/stored/categories');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //GET admin/categories/:id/edit
    editCategory(req, res, next) {
        Category.findById(req.params.id)
            .then((category) =>
                res.render('categories/edit', {
                    category: mongooseToObject(category),
                    layout: 'admin',
                }),
            )
            .catch(next);
    }

    //PUT admin/categories/:id
    updateCategory(req, res, next) {
        //res.json(req.params.id)
        Category.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/stored/categories'))
            .catch((error) => {
                console.log(error);
            });
    }

    //DELETE admin/categories/:id
    destroyCategory(req, res, next) {
        Category.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CategoryController();

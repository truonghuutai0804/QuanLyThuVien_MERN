const User = require('../models/User');
const Account = require('../models/Account');
const Violate = require('../models/Violate');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const slug = require('slug');

const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

const random = generator.generate({
    length: 4,
    numbers: true,
});
const password = generator.generate({
    length: 10,
    numbers: true,
});
const passwordHash = bcrypt.hashSync(password, 10);

class UserController {
    //USERS

    //GET admin/users/create
    createUsers(req, res, next) {
        res.render('users/create', {
            layout: 'admin',
        });
    }

    //POST admin/users/stored
    storeUsers(req, res, next) {
        const name = slug(req.body.nameUser, '_');

        const username = name + '_' + random;
        const accountNew = {
            username: username,
            password: passwordHash,
            role: 'USER',
        };
        const account = new Account(accountNew);

        const accountUserNew = {
            nameUser: req.body.nameUser,
            phoneUser: req.body.phoneUser,
            emailUser: req.body.emailUser,
            majorUser: req.body.majorUser,
            addressUser: req.body.addressUser,
            accountUser: account._id,
        };
        const user = new User(accountUserNew);

        user.save().catch((err) => {
            console.log(err);
        });

        console.log(password);

        account
            .save()
            .then(() => {
                res.redirect('/admin/stored/users');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //GET admin/users/:id/edit
    editUsers(req, res, next) {
        User.findById({ _id: req.params.id })
            .then((user) => {
                res.render('users/edit', {
                    user: mongooseToObject(user),
                    layout: 'admin',
                });
            })
            .catch(next);
    }

    async violateUsers(req, res, next) {
        let violate = await Violate.find({}).then().catch(next);
        let user = await User.findById({ _id: req.params.id })
            .then()
            .catch(next);
        res.render('users/violate', {
            violate: multipleMongooseToObject(violate),
            user: mongooseToObject(user),
            layout: 'admin',
        });
    }

    //PUT admin/users/:id
    updateUsers(req, res, next) {
        if (req.body.violateUser) {
            User.updateOne(
                { _id: req.params.id },
                { $push: { violateUser: req.body.violateUser } },
            )
                .then(() => {
                    res.redirect('/admin/stored/users');
                })
                .catch(next);
        } else {
            User.updateOne({ _id: req.params.id }, req.body)
                .then(() => {
                    res.redirect('/admin/stored/users');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    //DELETE admin/users/:id
    destroyUsers(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
}

module.exports = new UserController();

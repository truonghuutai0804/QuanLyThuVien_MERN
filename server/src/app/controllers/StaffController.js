const Staff = require('../models/Staff');
const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const slug = require('slug');

const { mongooseToObject } = require('../../util/mongoose');

const random = generator.generate({
    length: 4,
    numbers: true,
});
const password = generator.generate({
    length: 10,
    numbers: true,
});
const passwordHash = bcrypt.hashSync(password, 10);

class StaffController {
    //STAFFS

    //GET admin/staffs/create
    createStaffs(req, res, next) {
        res.render('staffs/create', {
            layout: 'admin',
        });
    }

    //POST admin/staffs/stored
    storeStaffs(req, res, next) {
        const name = slug(req.body.nameStaff, '_');

        const username = name + '_' + random;
        const accountNew = {
            username: username,
            password: passwordHash,
            role: 'STAFF',
        };
        const account = new Account(accountNew);

        const accountStaffNew = {
            nameStaff: req.body.nameStaff,
            phoneStaff: req.body.phoneStaff,
            addressStaff: req.body.addressStaff,
            emailStaff: req.body.emailStaff,
            accountStaff: account._id,
        };
        const staff = new Staff(accountStaffNew);

        staff.save().catch((err) => {
            console.log(err);
        });

        console.log(password);

        account
            .save()
            .then(() => {
                res.redirect('/admin/stored/staffs');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //GET admin/staffs/:id/edit
    editStaffs(req, res, next) {
        Staff.findById({ _id: req.params.id })
            .then((staff) => {
                res.render('staffs/edit', {
                    staff: mongooseToObject(staff),
                    layout: 'admin',
                });
            })
            .catch(next);
    }

    //PUT admin/staffs/id:
    updateStaffs(req, res, next) {
        Staff.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/admin/stored/staffs');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    destroyStaffs(req, res, next) {
        Staff.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
}

module.exports = new StaffController();

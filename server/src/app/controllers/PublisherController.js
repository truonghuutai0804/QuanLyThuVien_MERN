const Publisher = require('../models/Publisher');

const { mongooseToObject } = require('../../util/mongoose');

class PublisherController {
    //PUBLISHER

    //GET admin/publishers/create
    createPublishers(req, res, next) {
        res.render('publishers/create', {
            layout: 'admin',
        });
    }

    //POST admin/publishers/stored
    storePublishers(req, res, next) {
        const publisher = new Publisher(req.body);
        publisher
            .save()
            .then(() => {
                res.redirect('/admin/stored/publishers');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //GET admin/publishers/:id/edit
    editPublishers(req, res, next) {
        Publisher.findById(req.params.id)
            .then((publisher) => {
                res.render('publishers/edit', {
                    publisher: mongooseToObject(publisher),
                    layout: 'admin',
                });
            })
            .catch(next);
    }

    //PUT admin/publishers/:id

    updatePublishers(req, res, next) {
        Publisher.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/admin/stored/publishers');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //DELETE admin/publishers/:id <AJAX>
    async destroyPublishers(req, res, next) {
        let publisher = await Publisher.findById({ _id: req.params.id })
            .then()
            .catch(next);
        if (publisher.bookPublisher.length == 0) {
            Publisher.deleteOne({ _id: req.params.id })
                .then(() => {
                    res.send('SuccessDelete');
                })
                .catch(next);
        } else {
            res.send('NoDelete');
        }
    }
}

module.exports = new PublisherController();

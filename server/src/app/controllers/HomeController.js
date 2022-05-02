const Book = require('../models/Book');
const { multipleMongooseToObject } = require('../../util/mongoose');

//GET /
class HomeContoller {
    async index(req, res, next) {

        Book.find({})
            .populate({ modal: 'Author', path: 'authorBook' })
            .then((books) => {
                res.status(200).json({
                    status: 'success',
                    results: books.lenght,
                    data: { books }
                });
            })
            .catch(next);
    }
}

module.exports = new HomeContoller();

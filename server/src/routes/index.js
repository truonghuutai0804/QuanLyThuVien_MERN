const loginMiddleware = require('../app/middlewares/LoginMiddlewares');
const booksRouter = require('./books');
const siteRouter = require('./site');
const adminRouter = require('./admin');

function route(app) {
    app.use('/books', booksRouter);
    app.use('/admin', loginMiddleware, adminRouter);
    app.use('/', siteRouter);
}

module.exports = route;

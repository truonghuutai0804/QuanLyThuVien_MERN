module.exports = function (req, res, next) {
    var session;
    session = req.session;
    if (session && session.userid) {
        return next();
    } else {
        return next();
        //res.redirect('../login');
    }
};

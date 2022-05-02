class SiteContoller {
    //GET /search
    search(req, res) {
        res.render('search', { layout: 'admin' });
    }

    //GET /login
    login(req, res) {
        res.render('login');
    }
}

module.exports = new SiteContoller();

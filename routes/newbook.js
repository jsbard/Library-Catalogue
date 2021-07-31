var express = require('express');
var router = express.Router();

router.get('/books/new', function(req, res, next) {
    res.render('new-book', { title: 'Library Catalogue' });
});

module.exports = router;
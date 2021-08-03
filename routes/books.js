var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

router.get('/books', async function(req, res, next) {
        try {
            let books = await Book.findAll();
            res.render('index', { title: 'Library Catalogue', books: books});
        } catch (err) {
            console.log("Error retrieving books from database");
            next(err);
        }

});

module.exports = router;
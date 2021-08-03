var express = require('express');
var router = express.Router();
var book = require("../models").Book;

router.post('/books/new', async function(req, res, next) {

        try {
            await book.create({
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                year: req.body.year
            });
            res.redirect("/books");
        } catch (err) {
            res.render("new-book", {err: true});
        }
});

module.exports = router;
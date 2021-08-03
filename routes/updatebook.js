var express = require('express');
var router = express.Router();
var book = require("../models").Book;

router.get('/books/:id', function(req, res, next) {

        (async () => {
            try {
                const currentBook = await book.findByPk(req.params.id);
                const data = {
                    id: currentBook.id,
                    title: currentBook.title,
                    author: currentBook.author,
                    genre: currentBook.genre,
                    year: currentBook.year
                }

                res.render("update-book", data);
            } catch (err) {
                next();
            }
        })();

});

router.post('/books/:id', function(req, res, next){
    (async () => {
        try {
            const currentBook = await book.findByPk(req.params.id);
            const data = {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                year: req.body.year
            }

            await currentBook.update({
                title: data.title,
                author: data.author,
                genre: data.genre,
                year: data.year
            });

            res.redirect("/books");
        } catch (err) {
            const data = {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                year: req.body.year
            }

            res.render("update-book", {...data, err: true, id: req.params.id});
        }
    })();
});

module.exports = router;
var express = require('express');
var router = express.Router();
var book = require("../models").Book;

router.post('/books/:id/delete', function(req, res, next) {

    (async () => {
            try {
                const currentBook = await book.findByPk(req.params.id);
                await currentBook.destroy();
                res.redirect("/books");
            } catch (err) {
                res.render("update-book", {err: true});
            }
        }
    )();

});

module.exports = router;
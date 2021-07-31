var express = require('express');
var router = express.Router();
var book = require("../models").Book;

router.post('/books/:id/delete', function(req, res, next) {

    (async () => {
            const currentBook = await book.findByPk(req.params.id);
            await currentBook.destroy();
            res.redirect("/books");
        }
    )();

});

module.exports = router;
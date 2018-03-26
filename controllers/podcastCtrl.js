var express = require("express");
var router = express.Router();
var request = require("request");

router.get("/search", function(req, res) {
    res.render("search");
});

router.post("/search", function(req, res) {
    request(
        "https://itunes.apple.com/search?term=" +
            req.body.terms +
            "&media=podcast&entity=podcast&limit=12",
        function(error, response, body) {
            console.log("error:", error); // Print the error if one occurred
            console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
            console.log("body:", JSON.parse(body));
            res.render("search", {
                search_term: req.body.terms,
                results: JSON.parse(body).results,
                result_count: JSON.parse(body).resultCount
            });
        }
    );
});

router.get("/browse", function(req, res) {
    res.render("browse");
});

module.exports = router;

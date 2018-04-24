var express = require("express");
var router = express.Router();
var request = require("request");

let Parser = require("rss-parser");
let parser = new Parser();

const users = require('../models/userModel');
const episodes = require('../models/episodeModel');

router.get("/search", function(req, res) {
    res.render("search");
});

router.post("/search", function(req, res) {
    request(
        "https://itunes.apple.com/search?term=" +
            req.body.terms +
            "&media=podcast&entity=podcast&limit=12",
        function(error, response, body) {
            // console.log("error:", error);
            // console.log("statusCode:", response && response.statusCode);
            // console.log("body:", JSON.parse(body));
            res.render("search", {
                search_term: req.body.terms,
                results: JSON.parse(body).results,
                result_count: JSON.parse(body).resultCount
            });
        }
    );
});

router.get("/podcast/:id", function(req, res) {
    request("https://itunes.apple.com/lookup?id=" + req.params.id, 
    function(error, response,body) {
            if (req.user) {
                let favorites = episodes.getFavorites(req.user.id);
                let feed = parser.parseURL(
                    JSON.parse(body).results[0].feedUrl
                );
                Promise.all([favorites, feed]).then(result => {
                    res.render("podcast", {
                        result: JSON.parse(body).results[0],
                        feed: result[1].items,
                        link: result[1].link,
                        user: req.user,
                        favorites: result[0]
                    });
                });
            } else {
                (async() => {
                    let feed = await parser.parseURL(
                        JSON.parse(body).results[0].feedUrl
                    );
                    res.render("podcast", {
                        result: JSON.parse(body).results[0],
                        feed: feed.items,
                        link: feed.link,
                    });
                })();
            }
    });
});

router.get("/browse", function(req, res) {
    request(
        "https://itunes.apple.com/search?term=podcast&limit=100",
        function(error, response, body) {
            // console.log("error:", error);
            // console.log("statusCode:", response && response.statusCode);
            // console.log("body:", JSON.parse(body));
            res.render("browse", {
                podcasts: JSON.parse(body).results
            });
        }
    );
});

module.exports = router;

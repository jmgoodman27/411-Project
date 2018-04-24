var express = require('express');
var router = express.Router();

const users = require('../models/userModel');
const episodes = require('../models/episodeModel');

router.get('/favorites', function (req, res) {
    episodes.getFavorites(req.user.id).then((episodes) => {
            res.render('favorites', {episodes: episodes});
        });
});

router.post("/favorite-episode", function(req, res) {
    if(req.user) {
        episodes.getEpisode(req.user.id, req.body.name).then(result => {
            if(!(result.length > 0)) {
                episodes.saveEpisode(req.user.id, req.body.name, req.body.link, req.body.description, req.body.podcast_id, req.body.podcast_name).then(result => {
                    if(result) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(400);
                    }
                });
            } else {
                episodes.deleteEpisode(req.user.id, result.id).then(result => {
                    if(result) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(400);
                    }
                });
            }
        });
    }
});

router.post("/add-comment/:id", function(req, res) {
    if(req.user) {
        episodes.addComment(req.body.comment, req.user.id, req.params.id).then(result => {
            res.redirect('/favorites');
        });
    }
});

router.delete("/delete-comment/:id", function(req, res) {
    if(req.user) {
        episodes.deleteComment(req.user.id, req.params.id).then(result => {
            res.redirect('/favorites');
        });
    }
});

router.post("/edit-comment/:id", function(req, res) {
    if(req.user) {
        episodes.editComment(req.body.comment, req.user.id, req.params.id).then(result => {
            res.redirect('/favorites');
        });
    }
});

router.post("/save-rating/:id", function(req, res) {
    if(req.user) {
        episodes.saveRating(req.body.rating, req.user.id, req.params.id).then(result => {
            res.redirect('/favorites');
        });
    }
});

router.get("/remove-favorite/:id", function(req, res) {
    if(req.user) {
        episodes.deleteEpisode(req.user.id, req.params.id).then(result => {
            if(result) {
                res.redirect('/favorites');
            } else {
                res.sendStatus(400);
            }
        });
    }
});

module.exports = router;

var express = require('express');
var router = express.Router();

const users = require('../models/userModel');

router.get('/favorites', function (req, res) {
    let podcasts = [];
    var promises = [];
    users.getPodcasts(req.user.id).then(values => {
        values.forEach((val, index) => {
            let promise = users.getEpisodes(req.user.id, val.podcast_id).then(episodes => {
                const podcast = {
                    info: val, 
                    episodes: episodes
                };
                podcasts.push(podcast);
            });
            promises.push(promise);
         });
         Promise.all(promises).then(() => {
            res.render('favorites', {podcasts: podcasts});
        });
    });
});


router.post("/favorite-episode", function(req, res) {
    if(req.user) {
        users.savePodcast(req.user.id, req.body.podcast_id, req.body.podcast_name);
        users.getEpisode(req.user.id, req.body.name).then(result => {
            if(!(result.length > 0)) {
                users.saveEpisode(req.user.id, req.body.name, req.body.link, req.body.description, req.body.podcast_id).then(result => {
                    if(result) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(400);
                    }
                });
            } else {
                users.deleteEpisode(req.user.id, req.body.name).then(result => {
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

module.exports = router;

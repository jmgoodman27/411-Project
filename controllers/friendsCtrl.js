var express = require("express");
var router = express.Router();
var request = require("request");

const users = require('../models/userModel');
const episodes = require('../models/episodeModel');


router.get('/friends', function (req, res) {
    users.getFriends(req.user.id).then(friends => {
        req.session.friends = friends;
        res.render('friends', {friends: req.session.friends});
    });
});

get_friends = function (req, res) {
    let user_name;
    if(req.params.username) {
        user_name = req.params.username;
    } else {
        user_name = req.body.username;
    }
    users.getUser(user_name).then(result => {
        if(result) {
            episodes.getFavorites(result.id).then((episodes) => {
                res.render('friends', {
                    friends: req.session.friends,
                    user: result,
                    episodes: episodes,
                    search_term: user_name,
                    result: true,
                });
            });
        } else {
            res.render('friends', {
                friends: req.session.friends,
                search_term: user_name,
                result: false,
            });
        }
    });
}

router.get('/friends/:username', get_friends);
router.post('/friends', get_friends);

router.get('/save-friend/:id', function (req, res) {
    users.checkFriend(req.user.id, req.params.id).then(result => {
        if(typeof result == "undefined") {
            users.saveFriend(req.user.id, req.params.id).then(value => {
               res.redirect('/friends');
            });
        } else {
            res.redirect('/friends');
        }
    });
});

router.get('/delete-friend/:id', function (req, res) {
    users.deleteFriend(req.user.id, req.params.id).then(value => {
        res.redirect('/friends');
    });
});

module.exports = router;

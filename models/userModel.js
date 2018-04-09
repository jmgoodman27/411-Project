const db = require('../database.js')

module.exports.getUser = function (username) {
    return db.select('*')
        .from('user')
        .where('username', username)
        .first()
        .then(function (values) {
            return values;
        }).catch(function (err) {
            return err;
        });
};


module.exports.getPodcasts = function (user_id) {
    return db.select('podcast_id', 'podcast_name')
    .from('user_podcast')
    .where('user_id', user_id)
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};


module.exports.checkFriend = function (user_id, friend_id) {
    return db.select('*')
    .from('user_user')
    .where('user_user.user_id', user_id)
    .andWhere('user_user.friend_id', friend_id)
    .first()
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

module.exports.getFriends = function (user_id) {
    return db.select('user.username', 'user.id')
    .from('user_user')
    .leftJoin('user', 'user.id', 'user_user.friend_id')
    .where('user_user.user_id', user_id)
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

module.exports.getEpisodes = function (user_id, podcast_id) {
    return db.select('name', 'link', 'description')
    .from('user_episode')
    .where('user_id', user_id)
    .andWhere('podcast_id', podcast_id)
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

module.exports.getEpisode = function (user_id, name) {
    return db.select('name', 'link', 'description')
    .from('user_episode')
    .where('user_id', user_id)
    .andWhere('name', name)
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

module.exports.addUser = function (username, password, full_name) {
    return db('user')
    .insert({ 
        username: username, 
        password: password
    }).then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

module.exports.savePodcast = function (user_id, podcast_id, podcast_name) {
    return db('user_podcast')
    .insert({ 
        user_id: user_id, 
        podcast_id: podcast_id, 
        podcast_name: podcast_name, 
    }).then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

module.exports.saveEpisode = function (user_id, name, link, description, podcast_id) {
    return db('user_episode')
    .insert({ 
        user_id: user_id,
        name: name,
        link: link, 
        description: description, 
        podcast_id: podcast_id
    }).then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

module.exports.saveFriend = function (user_id, friend_id) {
    return db('user_user')
    .insert({ 
        user_id: user_id, 
        friend_id: friend_id
    }).then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

module.exports.deleteFriend = function (user_id, friend_id) {
    return db('user_user')
    .where('user_id', user_id)
    .andWhere('friend_id', friend_id)
    .del()
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

module.exports.deleteEpisode = function (user_id, name) {
    return db('user_episode')
    .where('user_id', user_id)
    .andWhere('name', name)
    .del()
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};
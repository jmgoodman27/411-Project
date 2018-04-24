const db = require('../database.js')

// Read
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

// Create
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

// Update
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

// Delete
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
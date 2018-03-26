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

module.exports.addUser = function (username, password, full_name) {
    return db('user')
    .insert({ 
        username: username, 
        password: password, 
        full_name: full_name
    }).then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

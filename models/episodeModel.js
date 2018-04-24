const db = require('../database.js')

// Read
module.exports.getFavorites = function (user_id) {
    return db.distinct(db.raw("episode.*, array_agg(jsonb_build_object('comment',comment.comment, 'id', comment.id) ORDER BY comment.id asc) AS comments")).select()
    .from('episode')
    .leftJoin('comment', function() {
        this.on('comment.user_id', '=', 'episode.user_id').andOn('comment.episode_id', '=', 'episode.id')
      })
    .where('episode.user_id', user_id)
    .groupBy('episode.id')
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};
module.exports.getEpisode = function (user_id, name) {
    return db.select('name', 'link', 'description')
    .from('episode')
    .where('user_id', user_id)
    .andWhere('name', name)
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

// Update
module.exports.saveEpisode = function (user_id, name, link, description, podcast_id, podcast_name) {
    return db('episode')
    .insert({ 
        user_id: user_id,
        name: name,
        link: link, 
        description: description, 
        podcast_id: podcast_id,
        podcast_name:podcast_name
    }).then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};
module.exports.saveRating = function (rating, user_id, episode_id) {
    return db('episode')
    .where('episode.id', episode_id)
    .andWhere('episode.user_id', user_id)
    .update({
        rating: rating
    })
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};
module.exports.editComment = function (comment, user_id, comment_id) {
    return db('comment')
    .where('comment.id', comment_id)
    .andWhere('comment.user_id', user_id)
    .update({
        comment: comment
    })
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

// Create
module.exports.addComment = function(comment, user_id, episode_id) {
    return db('comment')
    .insert({ 
        comment: comment,
        user_id: user_id,
        episode_id: episode_id
    }).then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
}   

// Delete
module.exports.deleteEpisode = function (user_id, id) {
    return db('episode')
    .where('user_id', user_id)
    .andWhere('id', id)
    .del()
    .then(function (result) {
        return result;
    }).catch(function (err) {
        console.log(err);
        return err;
    });
};
module.exports.deleteComment = function (user_id, comment_id) {
    return db('comment')
    .where('comment.user_id', user_id)
    .andWhere('comment.id', comment_id)
    .del()
    .then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};
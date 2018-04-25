
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('user', function(table) {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.timestamps();
        }).createTable('episode', function(table) {
            table.increments('id').primary();
            table.integer('user_id').references('user.id');
            table.string('name');
            table.string('link');
            table.integer('rating');
            table.text('description');
            table.integer('podcast_id');
            table.string('podcast_name');
        }).createTable('user_user', function(table) {
            table.increments('id').primary();
            table.integer('user_id').references('user.id');
            table.integer('friend_id').references('user.id');
        }).createTable('comment', function(table) {
            table.increments('id').primary();
            table.string('comment');
            table.integer('episode_id').references('episode.id').onDelete('cascade');
            table.integer('user_id').references('user.id');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.raw('DROP TABLE user_user CASCADE')
            .raw('DROP TABLE user_episode CASCADE')
            .dropTable('user')
    ])
};

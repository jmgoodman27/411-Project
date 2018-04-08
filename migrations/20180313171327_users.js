
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('user', function(table) {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('full_name').notNullable();
            table.timestamps();
        }).createTable('comment', function(table) {
            table.increments('id').primary();
            table.string('comment').notNullable();
            table.string('password').notNullable();
            table.string('full_name').notNullable(); 
            table.integer('user_id').references('user.id');
            table.integer('podcast_id');
        }).createTable('user_podcast', function(table) {
            table.integer('podcast_id').primary();
            table.integer('user_id').references('user.id');
            table.string('podcast_name');
        }).createTable('user_episode', function(table) {
            table.increments('id').primary();
            table.integer('user_id').references('user.id');
            table.string('name');
            table.string('link');
            table.string('description');
            table.integer('podcast_id').references('user_podcast.podcast_id');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.raw('DROP TABLE comment CASCADE')
            .raw('DROP TABLE user_episode CASCADE')
            .raw('DROP TABLE user_podcast CASCADE')
            .dropTable('user')
    ])
};

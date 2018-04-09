var config = require('./knexfile.js');
if (process.env.NODE_ENV == "production") {
    let env = 'production';
} else {
    let env = 'development';
}
var knex = require('knex')(config[env]);

module.exports = knex;
knex.migrate.latest([config]);

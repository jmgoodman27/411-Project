var config = require('./knexfile.js');
let env = 'development';
if (process.env.NODE_ENV == "production") {
    let env = 'production';
}
var knex = require('knex')(config[env]);

module.exports = knex;
knex.migrate.latest([config]);

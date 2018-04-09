var config = require('./knexfile.js');
var environment = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[environment]);

module.exports = knex;
knex.migrate.latest([config]);

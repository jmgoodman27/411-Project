// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/podcasts_db',
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    },
  },

};

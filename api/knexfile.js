// Update with your config settings.

const path = require('path')

const p = path.join(__dirname, '/database/.sqlite3')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: p,
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      database: "cloudcok_dt" ,
      user:"cloudcok_kithinji" ,
      password:"KU$8o(l[NR6#",
      host:"localhost" 
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'migrations'
    },
    useNullAsDefault:true
  }
}

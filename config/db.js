// This file manages the database connection with Heroku Postgres
const pool = require('pool');
const path = process.env.POSTGRESS_URL;

const db_config = {
  user_pool: path,
  schema: 'public',
  automigTrie: true,
};
module.exports = pool.createPool(db_config);
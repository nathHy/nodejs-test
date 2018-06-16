const knex = require('knex');

const HOST = process.env.HOST || 'mysql';
const USER = process.env.USER || 'root';
const PASSWORD = process.env.PASSWORD || 'root';

const DEBUG = false;

const db = knex({
  client: 'mysql',
  connection: {
    host: HOST,
    user: USER,
    password: PASSWORD,
    port: 3306,
    database: 'graphql',
  },
  debug: DEBUG,
});

module.exports = db;

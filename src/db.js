const knex = require('knex');
const fs = require('fs').promises;
const path = require('path');

const HOST = process.env.MYSQL_HOST || 'mysql';
const USER = process.env.MYSQL_USER || 'root';
const PASSWORD = process.env.MYSQL_PASSWORD || 'root';

const DEBUG = false;

console.log(`connecting to ${HOST} with ${USER}/${PASSWORD}`);

const db = knex({
  client: 'mysql',
  connection: {
    host: HOST,
    user: USER,
    password: PASSWORD,
    port: 3306,
    database: 'graphql',
    multipleStatements: true,
  },
  debug: DEBUG,
});

setTimeout(() => {
  fs.readFile(path.join(process.cwd(), 'db-schema.sql'))
    .then(sql => db.raw(sql))
    .then(() => console.log('Created db schema'))
    .catch(console.error);
}, 10000); // move to knex migration

module.exports = db;

const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'admin',
  port: 5432,
  password: 'admin',
  database: 'library'
});

client.connect();

module.exports = client;

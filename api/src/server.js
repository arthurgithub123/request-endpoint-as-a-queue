const express = require('express');

const bull = require('bull');

const app = express();

app.use(express.json());

const knex = require('knex')({
  client:     'postgresql',
  connection: {
    host:     'postgres',
    port:     5432,
    user:     'postgres',
    password: '1234',
    database: 'amount'
  }
});

const numberQueue = new bull(
  'NumberQueue',
  { redis: { host: 'redis', port: 6379 } }
);

app.post('/api/amount/no_queue', async (request, response) => {
  knex('amount_table')
    .where('id', '=', 1)
    .increment('amount', 1);

  return response
    .status(200)
    .send();
});

app.post('/api/amount/queue', async (request, response) => {
  await numberQueue.add();

  return response
    .status(200)
    .send();
});

app.listen(44332, () => console.log('Server running on 44332'));

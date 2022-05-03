const bull = require('bull');

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

numberQueue.process(
  async () => {
    return knex('amount_table')
      .where('id', '=', 1)
      .increment('amount', 1);
  }
);

numberQueue.on('active', (job, result) =>
  console.log(
    'Active job id: \n ',
    job.id,
    '\n result: \n',
    result
  )
);

numberQueue.on('completed', (job, result) =>
  console.log(
    'Completed job id: \n ',
    job.id,
    '\n result: \n',
    result
  )
);

numberQueue.on('failed', (job, result) =>
  console.log(
    'Failed job id: \n ',
    job.id,
    '\n result: \n',
    result
  )
);

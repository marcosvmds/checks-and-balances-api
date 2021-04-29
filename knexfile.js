module.exports = {
  production: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    debug: true 
  },
  development: {
    client: 'postgresql',
    // connection: {
    //   connectionString: 'postgres://ooxmxcwpxbxwhh:c9a7a0125024f222d9c26c73d2c245bd3ccacc0b50bc264b4b406e4707a4a6d3@ec2-34-233-0-64.compute-1.amazonaws.com:5432/d21ia1d46odccg',
    //   ssl: { rejectUnauthorized: false }
    // },
    connection: {
      database: 'checks_and_balances',
      user:     'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

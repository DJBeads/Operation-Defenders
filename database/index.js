
const { Pool } = require('pg');

const pool = new Pool({
    host: '192.168.99.100',
    port: 15432,

    database: 'postgres',
    password: 'postgres',
    user: 'postgres',

    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}



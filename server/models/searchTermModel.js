const { Pool } = require('pg');

const PG_URI = 'postgres://khxkmthl:UKqTB8i-CQjdf6mSh-SZT-71Xxsa8X8g@drona.db.elephantsql.com:5432/khxkmthl';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        console.log('Executed query: ', text);
        return pool.query(text, params, callback);
    }
}
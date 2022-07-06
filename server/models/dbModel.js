const { Pool } = require('pg');
const URI = "postgres://qcvltned:rCto0_PSjEfU5XNScSKhTDjUHbB63Cla@heffalump.db.elephantsql.com/qcvltned";

const pool = new Pool ({
    connectionString: URI
});

module.exports = {
  query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
  }
};


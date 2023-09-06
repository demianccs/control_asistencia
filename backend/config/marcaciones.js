const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'HOST', 
     user:'USER', 
     password: 'PASS',
     operatorsAliases: 0
     //connectionLimit: 15
});

module.exports = pool;




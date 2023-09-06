const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '89.117.59.147', 
     user:'datacombo', 
     password: 'D4t4comiano$2023!',
     operatorsAliases: 0
     //connectionLimit: 15
});

module.exports = pool;




const Pool = require("pg").Pool;
//inloggen db server
 const pool = new Pool({
    user: "su",
    password: "Qwerty123",
    host: "sociakdrink.postgres.database.azure.com",
    port: 5432,
    database: "Socialdrink",
    ssl: true
})

module.exports = pool;
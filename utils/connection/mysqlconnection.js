const mysql = require('mysql2');

function db (user, pass) {
    return mysql.createConnection(
        {
            host: 'localhost',
            user: user,
            password: pass,
            database: 'business_db'
        },
        console.log(`Connected to the business_db database.`)
    );
};

module.exports = db(a,b);
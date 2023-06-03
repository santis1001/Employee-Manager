const mysql = require('mysql');

class MYSQL {
    constructor(user, pass, port) {
        this.user = user;
        this.pass = pass;
        this.port = port;
    }

    db() {
        const db = mysql.createConnection({
            host: 'localhost',
            user: this.user,
            password: this.pass,
            port: this.port
        });

        return db;
    }
}

module.exports = MYSQL;

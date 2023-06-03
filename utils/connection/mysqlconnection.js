const mysql = require('mysql');
class MYSQL {
    constructor(user, pass) {
        this.user = user,
        this.pass = pass
    }

    db() {
        const db = mysql.createConnection({
            host: 'localhost',
            user: this.user,
            password: this.pass,
            port: '3305'
        });
    
        return db;
    };

}
module.exports = MYSQL;
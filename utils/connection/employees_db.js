const Table = require('cli-table');

function handler(db, type, data) {
    switch (type) {
        case 'add':
            addEmployee(db, data);
            break;
        case 'get':
            getEmployee(db)
            // console.log('get');
            break;
        case 'mod':
            modEmployee(db, data)
            break;
        case 'del':
            delEmployee(db,data)
            break;
        case 'delAll':
            console.log('delAll');
            break;
        default: false
            break;
    }
}
function getEmployee(db) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = 'SELECT * from employee';
        con.query(sqlQuery, (err, result, fields) => {
            // console.log(result);
            // console.log(fields);
            // console.log(err);
            // CreateTable(result)
            
            console.log('\n');
            console.table(result);
            console.log('\n');

        });
    });
}
function addEmployee(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');

        const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.name}","${data.last}",${data.role},${data.manager})`;
        con.query(sqlQuery, (err, results, fields) => {

            console.log('Creates Succesfully');            

            con.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                    return;
                }
                // console.log('Database connection closed.');
            });
        });
    })
}
function modEmployee(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        // console.log('Connected to the database.');

        const sqlQuery = `UPDATE employee SET first_name="${data.name}", last_name="${data.last}", role_id=${data.role}, manager_id=${data.manager} WHERE id=${data.id}`;
        con.query(sqlQuery, (err, results, fields) => {

            console.log('Updated Succesfully');            

            con.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                    return;
                }
                // console.log('Database connection closed.');
            });
        });
    })
}

function delEmployee(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM employee WHERE id = ${data.id}`;
        con.query(sqlQuery, (err, result, fields) => {
            // console.log(result);
            // console.log(fields);
            // console.log(err);
            // CreateTable(result)
            
            console.log(result);

        });
    });
} 
module.exports = handler;
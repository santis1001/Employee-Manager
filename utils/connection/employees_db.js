const Table = require('cli-table');

function handler(db, type, data) {
    switch (type) {
        case 'add':
            addEmployee(db, data);
            break;
        case 'get':
            getEmployee(db, data)
            // console.log('get');
            break;
        case 'mod':
            modEmployee(db, data)
            break;
        case 'del':
            delEmployee(db, data)
            break;
        case 'delAll':
            delAllEmployee(db)
            break;
        default: false
            break;
    }
}
function getEmployee(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        let sort;
        let filter = ' ';
        switch (data.sort) {
            case 'VAll':
                sort = 'e.id';
                break;
            case 'department':
                sort = 'e.first_name';
                filter = ` WHERE d.id = ${data.department} `;
                break; 
            case 'manager':
                sort = 'e.first_name';
                filter = ` WHERE m.id = ${data.manager} `;
                break;
        }

        const sqlQuery = `SELECT e.id AS employee_id, e.first_name AS employee_first_name,e.last_name AS employee_last_name, r.title AS employee_role, d.department_name AS role_department, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employee e LEFT JOIN employee m ON e.manager_id = m.id JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id${filter}ORDER BY ${sort} ${data.order};`;
        con.query(sqlQuery, (err, result, fields) => {
            // console.log(result); 
            // console.log(fields);
            //console.log(err);

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

            // console.log(result);

        });
    });
}
function delAllEmployee(db) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM employee`;
        con.query(sqlQuery, (err, result, fields) => {
            // console.log(result);
            // console.log(fields);
            // console.log(err);
            // CreateTable(result)

            // console.log(result);

        });
    });
}
module.exports = handler;
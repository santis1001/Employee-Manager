const mysql = require('mysql');
const fs = require('fs');

function init(db) {

    const con = db.db();

    const departmentQuery = 'SELECT * FROM department';
    const roleQuery = 'SELECT * FROM role';
    const employeeQuery = 'SELECT * FROM employee';

    con.query(departmentQuery, (error, departments) => {
        if (error) throw error;
        writeToFile('./utils/lib/jsonPersistence/departments.json', departments);

    });

    con.query(roleQuery, (error, roles) => {
        if (error) throw error;
        writeToFile('./utils/lib/jsonPersistence/roles.json', roles);
    });

    con.query(employeeQuery, (error, employees) => {
        if (error) throw error;
        writeToFile('./utils/lib/jsonPersistence/employees.json', employees);
    });
    con.end();
}
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content), (err) =>
        err ? true : false
    );
module.exports = init;
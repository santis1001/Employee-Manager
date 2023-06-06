function handler(db, type, data) {
    switch (type) {
        case 'add':
            addDepartment(db, data);
            break;
        case 'get':
            getDepartment(db)
            break;
        case 'getB':
            getDepartmentBudget(db, data)
            break;
        case 'mod':
            modDepartment(db, data)
            break;
        case 'del':
            delDepartment(db, data)
            break;
        case 'delAll':
            delAllDepartment(db)
            break;
        default: false
            break;
    }
}

function getDepartment(db) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = " SELECT id AS 'ID', department_name as 'Department Name' FROM department;";
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
function getDepartmentBudget(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `SELECT d.department_name AS 'Department', SUM(r.salary) AS 'Total Budget' FROM department d JOIN role r ON d.id = r.department_id JOIN employee e ON r.id = e.role_id WHERE d.id = ${data.id} GROUP BY d.department_name;`;
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
function addDepartment(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');

        const sqlQuery = `INSERT INTO department (department_name) VALUES ("${data.name}");`;
        con.query(sqlQuery, (err, results, fields) => {

            console.log('Created Succesfully');

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
function modDepartment(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        // console.log('Connected to the database.');

        const sqlQuery = `UPDATE department SET department_name="${data.name}" WHERE id=${data.id};`;
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
function delDepartment(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM department WHERE id = ${data.id};`;
        con.query(sqlQuery, (err, result, fields) => {
            // console.log(result);
            // console.log(fields);
            // console.log(err);
            // CreateTable(result)
            
            // console.log(result);

        });
    });
} 
function delAllDepartment(db) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM department;`;
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
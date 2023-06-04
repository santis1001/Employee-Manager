function handler(db, type, data) {
    switch (type) {
        case 'add':
            addRoles(db, data);
            break;
        case 'get':
            getRoles(db, data)
            console.log(data);
            break;
        case 'mod':
            modRoles(db, data)
            break;
        case 'del':
            delRoles(db, data)
            break;
        case 'delAll':
            delAllRoles(db)
            break;
        default: false
            break;
    }
}
function getRoles(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        let sqlQuery =
            (data.sort = 'department_name')
                ? `SELECT role.title, role.salary, department.department_name FROM role JOIN department ON role.id = department.id ORDER BY department.${data.sort} ${data.order};`
                : `SELECT role.title, role.salary, department.department_name FROM role JOIN department ON role.id = department.id ORDER BY role.${data.sort} ${data.order};`;

        // console.log(sqlQuery);
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
function addRoles(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');

        const sqlQuery = `INSERT INTO role (title, salary, department_id) VALUES ("${data.title}","${data.salary}",${data.role},${data.department_id})`;
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
function modRoles(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        // console.log('Connected to the database.');

        const sqlQuery = `UPDATE role SET title="${data.title}", salary="${data.salary}", department_id=${data.department_id} WHERE id=${data.id}`;
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
function delRoles(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM role WHERE id = ${data.id}`;
        con.query(sqlQuery, (err, result, fields) => {
            // console.log(result);
            // console.log(fields);
            // console.log(err);
            // CreateTable(result)

            // console.log(result);

        });
    });
}
function delAllRoles(db) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM role`;
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
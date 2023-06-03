const mysql = require('mysql2');
const inquirer = require('inquirer');
const employees = require('./utils/Controller/employees');
const roles = require('./utils/Controller/roles.js');
const department = require('./utils/Controller/department.js');
const database = require('./utils/Controller/database');

const EmployeeDBHandler = require('./utils/connection/employees_db');
const RolesDBHandler = require('./utils/Connection/roles_db');

const MYSQL = require('./utils/connection/mysqlconnection');


const login = [
    {
        type: 'input',
        name: 'user',
        message: 'Enter Username:',
        validate: (input) => {
            return (input != '') ? true : 'Enter USER';
        }
    },
    {
        type: 'input',
        name: 'password',
        message: 'Enter Password:',
        validate: (input) => {
            return (input != '') ? true : 'Enter PASSWORD';
        }
    },
    {
        type: 'input',
        name: 'port',
        message: 'Enter Port:',
        validate: (input) => {
            return (input != '') ? true : 'Enter Port information correctly:';
        }
    }
];

const main_questions = [
    {
        type: 'list',
        name: 'main_menu',
        message: 'What would you like to do?',
        choices: ['Employees Options', 'Roles Options', 'Department Options', 'Database Options', 'Quit']
    },
    {
        type: 'list',
        name: 'quit_op',
        message: 'Do you want to quit?',
        choices: ['Yes', 'No'],
        when: (answers) => answers.main_menu === 'Quit'
    }
];

function init() {

    inquirer.prompt(login).then((answers) => {
        const db_cred = {
            USER: answers.user,
            PASSWORD: answers.password,
            PORT: answers.port
        };
        startConnection(db_cred)
            .then(() => {
                console.log('Connection successful');
                startMenu();
            })
            .catch((err) => {
                init();
            });
    });
}
let db;
function startConnection(db_cred) {
    return new Promise((resolve, reject) => {
        const msq = new MYSQL(db_cred.USER, db_cred.PASSWORD, db_cred.PORT);
        db = msq.db();
        db.connect((err) => {
            if (err) {
                console.error('Error connecting to the database');
                reject(err);
                return;
            }
            const sql = `CREATE DATABASE IF NOT EXISTS business_db;`;
            db.query(sql, (err, result) => {
                if (err) {
                    console.error('Error creating database:', err);
                    reject(err);
                    return;
                }
                db.end();
                resolve(true);
            });
        });
    });
}


function startMenu() {
    inquirer.prompt(main_questions).then((answers) => {
        switch (answers.main_menu) {
            case 'Employees Options':
                employees_prompt()
                break;
            case 'Roles Options':
                roles_prompt();
                break;
            case 'Department Options':
                department_prompt();
                break;
            case 'Database Options':
                database_prompt();
                break;
            case 'Quit':
                (answers.quit_op === 'No') ? startMenu() : false;
                break;
            default:
                startMenu();
                break;
        }
    });
}
function employees_prompt() {
    inquirer.prompt(employees).then((answers) => {
        switch (answers.employees_op) {
            case 'View Employee':
                EmployeeDBHandler(db, 'get', null);
                employees_prompt();
                break;
            case 'Add Employee':
                data = {
                    name: answers.fname_add,
                    last: answers.lname_add,
                    role: answers.role_add,
                    manager: answers.manager_add
                };
                EmployeeDBHandler(db, 'add', data);
                employees_prompt();
                break;
            case 'Update Employee':
                data = {
                    id: answers.select_emp,
                    name: answers.fname_add,
                    last: answers.lname_add,
                    role: answers.role_add,
                    manager: answers.manager_add
                };
                EmployeeDBHandler(db, 'mod', data);
                employees_prompt();
                break;
            case 'Delete Employee':
                data = { id: answers.delete_emp };
                EmployeeDBHandler(db, 'del', data);
                employees_prompt();
                break;
            case 'Clear All Employees':
                (answers.confirm_del == 'Yes') ? (EmployeeDBHandler(db, 'delAll', null)) : false;
                employees_prompt();
                break;
            case 'Go Back':
                startMenu();
                break;
        }
    });
}
function roles_prompt() {
    inquirer.prompt(roles).then((answers) => {
        switch (answers.roles_op) {
            case 'View Roles':
                roles_prompt();
                break;
            case 'Add Roles':
                break;
            case 'Delete Roles':
                break;
            case 'Update Roles':
                break;
            case 'Clear All Roles':
                break;
            case 'Go Back':
                startMenu();
                break;
        }
    });
}
//'View Departments', 'Add Departments', 
//'Update Departments', 'Delete Departments', 'Clear All Departments', 'Go Back'],

function department_prompt() {
    inquirer.prompt(department).then((answers) => {
        switch (answers.departments_op) {
            case 'View Departments':
                department_prompt();
                break;
            case 'Add Departments':
                department_prompt();
                break;
            case 'Delete Departments':
                department_prompt();
                break;
            case 'Update Departments':
                department_prompt();
                break;
            case 'Clear All Departments':
                department_prompt();
                break;
            case 'Go Back':
                startMenu();
                break;
        }
    });
}
function database_prompt() {
    inquirer.prompt(database).then((answers) => {
        switch (answers.database_op) {
            case 'Initialize database':

                break;
            case 'Clear database':

                break;
            case 'Go Back':
                startMenu();
                break;
        }
    });
}
init();
module.exports = startMenu;

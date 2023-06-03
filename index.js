const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const employees = require('./utils/Controller/employees');
const roles = require('./utils/Controller/roles.js');
const department = require('./utils/Controller/department.js');

const EmployeeDBHandler = require('./utils/Connection/employees_db');
const RolesDBHandler = require('./utils/Connection/roles_db');
const DepartmentDBHandler = require('./utils/Connection/department_db');
const PersistentDB = require('./utils/Connection/persistendb');

const MYSQL = require('./utils/connection/mysqlconnection');

const login = [
    {
        type: 'input',
        name: 'user',
        message: 'Enter Username:',
        default: 'root',
        validate: (input) => {
            return (input != '') ? true : 'Enter USER';
        }
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter Password:',
        mask: '*',
        default: '3b9212b26c7fe4f4609fe1b2ecfa949959b1770ae090f7c4d602673e4b3b613d',
        transformer: (input) => '*'.repeat(input.length),
        validate: (input) => {
            return (input != '') ? true : 'Enter PASSWORD';
        }
    },
    {
        type: 'input',
        name: 'port',
        message: 'Enter Port:',
        default: '3305',
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
        choices: ['Employees Options', 'Roles Options', 'Department Options', 'Quit']
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
        db = new MYSQL(db_cred.USER, db_cred.PASSWORD, db_cred.PORT);
        const db_con = db.db();
        db_con.connect((err) => {
            if (err) {
                console.error('Error connecting to the database');
                reject(err);
                return;
            }
            const sql = `CREATE DATABASE IF NOT EXISTS business_db;`;
            db_con.query(sql, (err, result) => {
                if (err) {
                    console.error('Error creating database:', err);
                    reject(err);
                    return;
                }
                db_con.end();
                resolve(true);
            });
        });
        PersistentDB(db);
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
            case 'Quit':
                (answers.quit_op === 'No') ? startMenu() : process.exit(0);                
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
                    name: answers.fname_up,
                    last: answers.lname_up,
                    role: answers.role_up,
                    manager: answers.manager_up
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
                RolesDBHandler(db, 'get', null);
                roles_prompt();
                break;
            case 'Add Roles':
                data = {
                    title: answers.title_add,
                    salary: answers.salary_add,
                    department_id: answers.dep_select_add
                };
                RolesDBHandler(db, 'add', data);
                roles_prompt();
                break;
            case 'Update Roles':
                data = {
                    id: answers.roles_mod,
                    title: answers.title_mod,
                    salary: answers.salary_mod,
                    department_id: answers.dep_select_mod
                };
                RolesDBHandler(db, 'mod', data);
                roles_prompt();
                break;
            case 'Delete Roles':
                data = { id: answers.role_select_del };
                RolesDBHandler(db, 'del', data);
                roles_prompt();
                break;
            case 'Clear All Roles':
                (answers.role_confirm_del == 'Yes') ? (RolesDBHandler(db, 'delAll', null)) : false;
                roles_prompt();
                break;
            case 'Go Back':
                startMenu();
                break;
        }
    });
}
function department_prompt() {
    inquirer.prompt(department).then((answers) => {
        switch (answers.departments_op) {
            case 'View Departments':
                DepartmentDBHandler(db, 'get', null);
                department_prompt()
                break;
            case 'Add Departments':
                data = {
                    name: answers.depname_add,
                };
                DepartmentDBHandler(db, 'add', data);
                department_prompt()
                break;
            case 'Update Departments':
                data = {
                    id: answers.dep_select_mod,
                    name: answers.depname_mod
                };
                DepartmentDBHandler(db, 'mod', data);
                department_prompt()
                break;
            case 'Delete Departments':
                data = { id: answers.dep_select_del };
                DepartmentDBHandler(db, 'del', data);
                department_prompt()
                break;
            case 'Clear All Departments':
                (answers.dep_confirm_del == 'Yes') ? (DepartmentDBHandler(db, 'delAll', null)) : false;
                department_prompt()
                break;
            case 'Go Back':
                startMenu();
                break;
        }
    });
}

function printTitle() {
    const filePath = path.join(__dirname, './utils/Title/Title.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log('Employee\nManager');
            return;
        }
        console.log(data+'\n');
        init();
    });
}
printTitle();
module.exports = startMenu;

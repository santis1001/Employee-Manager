const emplist = require('../lib/jsonPersistance/employees.json')
const rolelist = require('../lib/jsonPersistance/roles.json')

const emp_questions = [
    {
        type: 'list',
        name: 'employees_op',
        message: 'Employees Menu: What would you like to do?',
        choices: ['View Employee', 'Add Employee', 'Update Employee', 'Delete Employee', 'Clear All Employees', 'Go Back'],
    },
    {
        type: 'input',
        name: 'fname_add',
        message: 'Add Employee\nEnter first name: ',
        when: (answers) => answers.employees_op === 'Add Employee',
        validate: (input) => {
            return (input != '') ? true : 'Enter first name';
        },
    },
    {
        type: 'input',
        name: 'lname_add',
        message: 'Enter last name: ',
        when: (answers) => answers.employees_op === 'Add Employee',
        validate: (input) => {
            return (input != '') ? true : 'Enter first name';
        },
    },
    {
        type: 'list',
        name: 'role_add',
        message: 'Enter employee role: ',
        choices: rolelist.map(item => ({
            name: item.id + ': ' + item.title + ' ' + item.department_id,
            value: item.id
        })),
        when: (answers) => answers.employees_op === 'Add Employee'
    },
    {
        type: 'list',
        name: 'manager_add',
        message: 'Enter employee manager: ',
        choices: emplist.map(item => ({
            name: item.id + ': ' + item.first_name + ' ' + item.last_name,
            value: item.id
        })),
        when: (answers) => answers.employees_op === 'Add Employee'
    },
    {
        type: 'list',
        name: 'select_emp',
        message: 'Update Employee\nSelect Employee',
        choices: emplist.map(item => ({
            name: item.id + ': ' + item.first_name + ' ' + item.last_name,
            value: item.id
        })),
        when: (answers) => answers.employees_op === 'Update Employee'
    },
    {
        type: 'input',
        name: 'fname_up',
        message: 'Enter first name: ',
        default: (answers) => {
            const selectedEmployee = emplist.find(item => item.id === answers.select_emp);
            return selectedEmployee ? selectedEmployee.first_name : '';
        },
        when: (answers) => answers.employees_op === 'Update Employee',
        validate: (input) => {
            return (input != '') ? true : 'Enter first name';
        },
    },
    {
        type: 'input',
        name: 'lname_up',
        message: 'Enter last name: ',
        default: (answers) => {
            const selectedEmployee = emplist.find(item => item.id === answers.select_emp);
            return selectedEmployee ? selectedEmployee.last_name : '';
        },
        when: (answers) => answers.employees_op === 'Update Employee' ,
        validate: (input) => {
            return (input != '') ? true : 'Enter last name';
        },
    },
    {
        type: 'list',
        name: 'role_up',
        message: 'Enter employee role: ',        
        default: (answers) => {
            const selectedEmployee = rolelist.find(item => item.id === answers.roles_mod);
            const selectedEmployeeIndex = rolelist.indexOf(selectedEmployee);
            return selectedEmployeeIndex !== -1 ? selectedEmployeeIndex : 0;
        },
        choices: rolelist.map(item => ({
            name: item.id + ': ' + item.title,
            value: item.id
        })),
        when: (answers) => answers.employees_op === 'Update Employee'
    },
    {
        type: 'list',
        name: 'manager_up',
        message: 'Enter employee manager: ',        
        default: (answers) => {
            const selectedEmployee = emplist.find(item => item.id === answers.roles_mod);
            const selectedEmployeeIndex = rolelist.indexOf(selectedEmployee);
            return selectedEmployeeIndex !== -1 ? selectedEmployeeIndex : 0;
        },
        choices: emplist.map(item => ({
            name: item.id + ': ' + item.first_name + ' ' + item.last_name,
            value: item.id
        })),
        when: (answers) => answers.employees_op === 'Update Employee'
    },
    {
        type: 'list',
        name: 'delete_emp',
        message: 'Select employee:',
        choices: emplist.map(item => ({
            name: item.id + ': ' + item.first_name + ' ' + item.last_name,
            value: item.id
        })),
        when: (answers) => answers.employees_op === 'Delete Employee'
    },
    {
        type: 'list',
        name: 'confirm_del',
        message: 'Confirm delete all entries',
        choices: ['Yes', 'No'],
        when: (answers) => answers.employees_op === 'Clear All Employees'
    }
];


module.exports = emp_questions;
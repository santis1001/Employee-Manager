
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
        choices: ['1','2','3'],
        when: (answers) => answers.employees_op === 'Add Employee'
    },
    {
        type: 'list',
        name: 'manager_add',
        message: 'Enter employee manager: ',
        choices: ['1','2','3'],
        when: (answers) => answers.employees_op === 'Add Employee'
    },
    {
        type: 'list',
        name: 'select_emp',
        message: 'Update Employee\nSelect Employee',
        choices: ['1','2','3'],
        when: (answers) => answers.employees_op === 'Update Employee'
    },
    {
        type: 'input',
        name: 'fname_up',
        message: 'Enter first name: ',
        default: '',
        when: (answers) => answers.employees_op === 'Update Employee' && answers.select_emp != 'Cancel',
        validate: (input) => {
            return (input != '') ? true : 'Enter first name';
        },
    },
    {
        type: 'input',
        name: 'lname_up',
        message: 'Enter last name: ',
        default: '',
        when: (answers) => answers.employees_op === 'Update Employee' && answers.select_emp != 'Cancel',
        validate: (input) => {
            return (input != '') ? true : 'Enter last name';
        },
    },
    {
        type: 'list',
        name: 'role_up',
        message: 'Enter employee role: ',
        choices: ['1','2','3'],
        when: (answers) => answers.employees_op === 'Update Employee' && answers.select_emp != 'Cancel'
    },
    {
        type: 'list',
        name: 'manager_up',
        message: 'Enter employee manager: ',
        choices: ['1','2','3'],
        when: (answers) => answers.employees_op === 'Update Employee' && answers.select_emp != 'Cancel'
    },
    {
        type: 'list',
        name: 'delete_emp',
        message: 'Select employee:',
        choices: ['1','2','3'],
        when: (answers) => answers.employees_op === 'Delete Employee'
    },
    {
        type: 'list',
        name: 'confirm_del',
        message: 'Confirm delete all entries',
        choices: ['Yes','No'],
        when: (answers) => answers.employees_op === 'Clear All Employees'
    }
];


module.exports = emp_questions;
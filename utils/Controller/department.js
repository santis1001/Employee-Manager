const deplist = require('../lib/jsonPersistance/departments.json')

const dep_questions = [
    {
        type: 'list',
        name: 'departments_op',
        message: 'Departments Options',
        choices: ['View Departments','View Budget', 'Add Departments', 'Update Departments', 'Delete Departments', 'Clear All Departments', 'Go Back'],
    },
    {
        type: 'list',
        name: 'dep_select_bud',
        message: 'View Department Budget\nSelect Department: ',
        choices: deplist.map(item => ({
            name: item.id + ': ' + item.department_name,
            value: item.id
        })),
        when: (answers) => answers.departments_op === 'View Budget',
    },
    {
        type: 'input',
        name: 'depname_add',
        message: 'Add Departments\nEnter Department Name: ',
        when: (answers) => answers.departments_op === 'Add Departments',
        validate: (input) => {
            return (input != '') ? true : 'Enter Department name:';
        },
    },
    {
        type: 'list',
        name: 'dep_select_mod',
        message: 'Update Departments\nSelect Department: ',
        choices: deplist.map(item => ({
            name: item.id + ': ' + item.department_name,
            value: item.id
        })),
        when: (answers) => answers.departments_op === 'Update Departments',
    },
    {
        type: 'input',
        name: 'depname_mod',
        message: 'Enter new Department name: ',
        default: (answers) => {
            const selectedDepartment = deplist.find(item => item.id === answers.dep_select_mod);
            return selectedDepartment ?  selectedDepartment.department_name : '';
        },
        when: (answers) => answers.departments_op === 'Update Departments',
        validate: (input) => {
            return (input != '') ? true : 'Enter Department name:';
        },
    },
    {
        type: 'list',
        name: 'dep_select_del',
        message: 'Delete Departments\nSelect Department: ',
        choices: deplist.map(item => ({
            name: item.id + ': ' + item.department_name,
            value: item.id
        })),
        when: (answers) => answers.departments_op === 'Delete Departments',
    },
    {
        type: 'list',
        name: 'dep_confirm_del',
        message: 'Confirm: ',
        choices: ['Yes','No'],
        when: (answers) => answers.departments_op === 'Clear All Departments' ,
    }
];

module.exports =dep_questions ;
const inquirer = require('inquirer');
const deplist = require('../lib/jsonPersistence/departments.json')
const rolelist = require('../lib/jsonPersistence/roles.json')

const roles_questions = [
    {
        type: 'list',
        name: 'roles_op',
        message: 'Roles Options',
        choices: ['View Roles', 'Add Roles', 'Update Roles', 'Delete Roles', 'Clear All Roles', 'Go Back']
    },
    {
        type: 'list',
        name: 'view_sort',
        message: 'Sort by: ',
        choices: [
            {
                name: 'Title',
                value: 'title'
            },
            {
                name: 'Salary',
                value: 'salary'
            },
            {
                name: 'Department',
                value: 'department_name'
            },
        ],
        when: (answers) => answers.roles_op === 'View Roles',
    },
    {
        type: 'list',
        name: 'view_order',
        message: 'Order: ',
        choices: [
            {
                name: 'Ascending',
                value: 'ASC'
            },
            {
                name: 'Descending',
                value: 'DESC'
            }
        ],
        when: (answers) => answers.roles_op === 'View Roles',
    },
    {
        type: 'input',
        name: 'title_add',
        message: 'Add Roles\nEnter Department name: ',
        when: (answers) => answers.roles_op === 'Add Roles',
        validate: (input) => {
            return (input != '') ? true : 'Enter Role name:';
        },
    },
    {
        type: 'input',
        name: 'salary_add',
        message: 'Enter Role salary:',
        when: (answers) => answers.roles_op === 'Add Roles',
        validate: (input) => {
            return (input != '') ? true : 'Enter Role salary: ';
        },
    },
    {
        type: 'list',
        name: 'dep_select_add',
        message: 'Select Role Department: ',
        choices: deplist.map(item => ({
            name: item.id + ': ' + item.department_name,
            value: item.id
        })),
        when: (answers) => answers.roles_op === 'Add Roles',
    },
    {
        type: 'list',
        name: 'roles_mod',
        message: 'Update Roles\nSelect role: ',
        choices: rolelist.map(item => ({
            name: item.id + ': ' + item.title,
            value: item.id
        })),
        when: (answers) => answers.roles_op === 'Update Roles'
    },
    {
        type: 'input',
        name: 'title_mod',
        message: 'Enter Role title: ',
        default: (answers) => {
            const selectedRole = rolelist.find(item => item.id === answers.roles_mod);
            return selectedRole ? (selectedRole.title) : '';
        },
        when: (answers) => answers.roles_op === 'Update Roles',
        validate: (input) => {
            return (input != '') ? true : 'Enter Rocles title:';
        },
    },
    {
        type: 'input',
        name: 'salary_mod',
        message: 'Enter Role salary:',
        default: (answers) => {
            const selectedRole = rolelist.find(item => item.id === answers.roles_mod);
            return selectedRole ? (selectedRole.salary) : '';
        },
        when: (answers) => answers.roles_op === 'Update Roles',
        validate: (input) => {
            return (input != '') ? true : 'Enter Role salary: ';
        },
    },
    {
        type: 'list',
        name: 'dep_select_mod',
        message: 'Select Department: ',
        default: (answers) => {
            const selectedDepartment = rolelist.find(item => item.id === answers.roles_mod);
            const selectedDepartmentObj = deplist.find(dep => dep.id === selectedDepartment.department_id)
            const selectedDepartmentIndex = deplist.indexOf(selectedDepartmentObj);
            return selectedDepartmentIndex !== -1 ? selectedDepartmentIndex : 0;
        },
        choices: deplist.map(item => ({
            name: item.id + ': ' + item.department_name,
            value: item.id
        })),
        when: (answers) => answers.roles_op === 'Update Roles',
    },

    {
        type: 'list',
        name: 'role_select_del',
        message: 'Delete Role\nSelect Role: ',
        choices: rolelist.map(item => ({
            name: item.id + ': ' + item.department_name,
            value: item.id
        })),
        when: (answers) => answers.roles_op === 'Delete Roles',
    },
    {
        type: 'list',
        name: 'role_confirm_del',
        message: 'Confirm: ',
        choices: ['Yes', 'No'],
        when: (answers) => answers.roles_op === 'Clear All Roles',
    }
];

module.exports = roles_questions;
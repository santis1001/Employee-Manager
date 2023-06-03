const inquirer = require('inquirer');

const roles_questions = [
    {
        type: 'list',
        name: 'roles_op',
        message: 'Roles Options',
        choices: ['View Roles', 'Add Roles', 'Update Roles', 'Delete Roles', 'Clear All Roles','Go Back']    
    },
    {
        type: 'input',
        name: 'title_add',
        message: 'Add Roles\nEnter Department name: ',
        when: (answers) => answers.roles_op === 'Add Roles',
        validate: (input) => {
            return (input != '') ? true : 'Enter Department name:';
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
        choices:  ['1','2','3'],
        when: (answers) => answers.roles_op === 'Add Roles',
    },
    {
        type: 'list',
        name: 'roles_mod',
        message: 'Update Roles\nSelect role: ',
        choices: ['1','2','3'],
        when: (answers) => answers.roles_op === 'Update Roles'        
    },
    {
        type: 'input',
        name: 'title_mod',
        message: 'Enter Role title: ',
        when: (answers) => answers.roles_op === 'Update Roles',
        validate: (input) => {
            return (input != '') ? true : 'Enter Rocles title:';
        },
    },
    {
        type: 'input',
        name: 'salary_mod',
        message: 'Enter Role salary:',
        when: (answers) => answers.roles_op === 'Update Roles',
        validate: (input) => {
            return (input != '') ? true : 'Enter Role salary: ';
        },
    },
    {
        type: 'list',
        name: 'dep_select_mod',
        message: 'Select Department: ',
        choices: ['1','2','3'],
        when: (answers) => answers.roles_op === 'Update Roles',
    },
    
    {
        type: 'list',
        name: 'role_select_del',
        message: 'Delete Role\nSelect Role: ',
        choices:  ['1','2','3'],
        when: (answers) => answers.roles_op === 'Delete Roles',
    },
    {
        type: 'list',
        name: 'role_confirm_del',
        message: 'Confirm: ',
        choices: ['Yes','No'],
        when: (answers) => answers.roles_op === 'Clear All Roles' && answers.role_select_del != 'Cancel',
    }
];

module.exports = roles_questions;
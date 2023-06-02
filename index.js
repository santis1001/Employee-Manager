const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
    {
        type : 'list',
        name : 'main_menu',
        message : 'What would you like to do?',
        choices: ['Employees Options','Roles Options', 'Department Option','Database Options','Quit']
    },
    {
        type: 'list',
        name: 'employees_op',
        message: 'Employees Options',
        choices: ['','','',''],
        when: (answers) => answers.main_menu === 'Employees Options'         
    },
    {
        type: 'list',
        name: 'roles_op',
        message: 'Employees Options',
        when: (answers) => answers.main_menu === 'Roles Options',
    },
    {
        type: 'list',
        name: 'department_op',
        message: 'Department Option',
        when: (answers) => answers.main_menu === 'Department Option'         
    },
    {
        type: 'list',
        name: 'database_op',
        message: 'Database Option',
        when: (answers) => answers.main_menu === 'Database Option'         
    },
    {
        type: 'list',
        name: 'quit_op',
        message: 'Do you want to quit?',
        when: (answers) => answers.main_menu === 'Quit'         
    }
];
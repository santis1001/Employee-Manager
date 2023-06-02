const inquirer = require('inquirer');
const employees = require('./utils/Controller/employees.js');
const roles = require('./utils/Controller/roles.js');
const department = require('./utils/Controller/department.js');
const database = require('./utils/Controller/database.js');


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
    inquirer.prompt(main_questions).then((answers) => {
        (answers.quit_op == 'No') ? init() : false;
        (answers.main_menu == 'Employees Options') ? employees.init() : false;
        (answers.main_menu == 'Roles Options') ? roles.init() : false;
        (answers.main_menu == 'Department Options') ? department.init() : false;
        (answers.main_menu == 'Database Options') ? database.init() : false;
        (answers.quit_op == 'Yes') ? false : init();
    });

}
init()

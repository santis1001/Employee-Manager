const inquirer = require('inquirer');

const emp_questions = [
    {
        type: 'list',
        name: 'employees_op',
        message: 'Employees Options',
        choices: ['View Employee', 'Add Employee', 'Update Employee', 'Delete Employee', 'Clear All Employees'],
        when: (answers) => answers.main_menu === 'Employees Options'
    }
]

function init() {
    console.log('employee');
}

module.exports = {
    init: init
};
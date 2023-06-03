const dep_questions = [
    {
        type: 'list',
        name: 'departments_op',
        message: 'Departments Options',
        choices: ['View Departments', 'Add Departments', 'Update Departments', 'Delete Departments', 'Clear All Departments', 'Go Back'],
    },
    {
        type: 'input',
        name: 'depname_add',
        message: 'Add Departments\nEnter Department name: ',
        when: (answers) => answers.departments_op === 'Add Departments',
        validate: (input) => {
            return (input != '') ? true : 'Enter Department name:';
        },
    },
    {
        type: 'list',
        name: 'dep_select_mod',
        message: 'Update Departments\nSelect Department: ',
        choices: ['1','2','3'],
        when: (answers) => answers.departments_op === 'Update Departments',
    },
    {
        type: 'input',
        name: 'depname_mod',
        message: 'Enter new Department name: ',
        when: (answers) => answers.departments_op === 'Update Departments',
        validate: (input) => {
            return (input != '') ? true : 'Enter Department name:';
        },
    },
    {
        type: 'list',
        name: 'dep_select_del',
        message: 'Delete Departments\nSelect Department: ',
        choices:  ['1','2','3'],
        when: (answers) => answers.departments_op === 'Delete Departments',
    },
    {
        type: 'list',
        name: 'dep_confirm_del',
        message: 'Confirm: ',
        choices: ['Yes','No'],
        when: (answers) => answers.departments_op === 'Clear All Departments' && answers.dep_select_del != 'Cancel',
    }
];

module.exports =dep_questions ;
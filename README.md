# Employee_Manager
12 Challenge

## Description


## User Story

## Acceptance Criteria

## Usage
### Set up project
```
npm init -y
```
Install the MySQL package
```
npm install mysql
```
Install the Inquirer at Version 8.2.4
```
npm install inquirer@8.2.4
```
## Set up the Database
### Set Database structure
```
SOURCE path_to/schema.sql;
```
### Prefill the Database (optional)
```
SOURCE path_to/seeds.sql
```
### Run the app
```
node index.js
```
## Code
### Functionalty
The main script of the app is the index.js at the root folder, this script controls everything on the app, sets up the credentials for the mysql connection, establish connection and make the Inquire Menu;
### Diagram
```
index.js
├─ Inquirer Questions
│   ├─ credentials
│   │   └─ import credential if exists
│   ├─ department.js
│   │   └─ departments.json
│   ├─ employee.js
│   │   ├─ employees.json
│   │   ├─ roles.json
│   │   └─ departments.json 
│   └─ roles.js
│       ├─ roles.json
│       └─ departments.json 
├─ Connection Handler
│   ├─ employees_db.js
│   │   └─ View, Add, Update, Delete, Delete All, filter queries
│   ├─ department_db.js
│   │   └─ View, Add, Update, Delete, Delete All queries
│   ├─ roles_db.js
│   │   └─ View, Add, Update, Delete, Delete All, filter queries
│   └─ persistent_db.js
│       ├─ Set department table => department.json
│       ├─ Set roles table => roles.json
│       └─ Set employees table => employees.json 
└─ MYSQL
    ├─ class constructor for credentials
    └─ connection method
```
### Inquirer Questions
**LogIn - Credentials**

The Log Credentials prompts uses an object that tries to read a file and if exists it uses its content as default credential for the login, making it easier to access if it does not exists it set blanks values.

```js
let cred;
try {    
    cred = require('./utils/credentials/credentials.json');
} catch (error) {
    cred = {
        "user":"",
        "pass": "",
        "port":""
    };
}
const login = [
    {
        type: 'input',
        name: 'user',
        message: 'Enter Username:',
        default: cred.user,
        validate: (input) => {
            return (input != '') ? true : 'Enter USER';
        }
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter Password:',
        mask: '*',
        default: cred.pass,
        transformer: (input) => '*'.repeat(input.length),
        validate: (input) => {
            return (input != '') ? true : 'Enter PASSWORD';
        }
    },
    {
        type: 'input',
        name: 'port',
        message: 'Enter Port:',
        default: cred.port,
        validate: (input) => {
            return (input != '') ? true : 'Enter Port information correctly:';
        }
    }
];
```
**Main Menu prompt**

The main menu prompt has 2 questions. The first question has 4 option which are `Employees Options`, `Roles Options`, `Department Options`, `Quit`. The second just appears when the `Quit` option is selected, this prompt is to confirm if you want to quit, the options are `Yes`, `No`.
```js
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
```
### Menu Options
**Department**

The Department Inquirer Menu prompts 7 questions.  

* View Departments  
* View Budget 
    * Select Department (Department list)
* Add Departments 
    * Input Name (Input)
* Update Departments
    * Select Department (Department list)
    * Input Name (Input)
* Delete Departments
    * Select Department (Department list)
* Clear All Departments
    * Confirm (Yes, No)
* Go Back

The Choice Questions uses an array for its choices. the Question the select a department to update or delete will prompt a choice list which one must be selected.
```js
choices: deplist.map(item => ({
    name: item.id + ': ' + item.department_name,
    value: item.id
})),
```
In the Update Department section, the default value will set to the name of the selected department, as a reminder of the set Value.
```js
default: (answers) => {
    const selectedDepartment = deplist.find(item => item.id === answers.dep_select_mod);
    return selectedDepartment ?  selectedDepartment.department_name : '';
},
```

**Roles**

The Roles Inquirer Menu prompts 6 questions. 
* View Roles  
    * Select Sort by (Title, Salary, Department)
    * Select Order by (Ascending, Descending)
* Add Roles 
    * Input Title (Input)
    * Input Salary (Input)
    * Select Department (Department list)
* Update Roles
    * Select Role (Roles list)
    * Input Title (Input)
    * Input Salary (Input)
    * Select Department (Department list)
* Delete Roles
    * Select Role (Roles list)
* Clear All Roles
    * Confirm (Yes, No)
* Go Back

The most of the question uses a list choice format. 
The Choice Questions uses an array for its choices. the Question the select a department to add to role or select role to update or delete will prompt a choice list which one must be selected.

Roles List

```js
choices: rolelist.map(item => ({
    name: item.id + ': ' + item.title,
    value: item.id
})),
```

Department List

```js
choices: deplist.map(item => ({
    name: item.id + ': ' + item.department_name,
    value: item.id
})),
```

When Updating an existing Role the default Values are set to the origiinal values as a reminder of the values.

```js
default: (answers) => {
    const selectedRole = rolelist.find(item => item.id === answers.roles_mod);
    return selectedRole ? (selectedRole.salary) : '';
},
```

**Employee**

The Employee Inquirer Menu prompts 6 questions. 
* View Employee  
    * View All
        * Select Order by id (Ascending, Descending)
    * Department    
        * Select Filter by (Department list)
        * Select Order by First Name (Ascending, Descending)
    * Manager    
        * Select Filter by (Employee list)
        * Select Order by First Name (Ascending, Descending)
* Add Employee 
    * Input First Name (Input)
    * Input Last Name (Input)
    * Select Role (Roles list)
    * Select Manager (Employees list)
* Update Employee
    * Select Employee (Employee list)
    * Input First Name (Input)
    * Input Last Name (Input)
    * Select Role (Roles list)
    * Select Manager (Employees list)
* Delete Employee
    * Select Employee (Employees list)
* Clear All Employees
    * Confirm (Yes, No)
* Go Back

Employees List

```js
choices: emplist.map(item => ({
    name: item.id + ': ' + item.first_name + ' ' + item.last_name,
    value: item.id
})),
```

Roles List

```js
choices: rolelist.map(item => ({
    name: item.id + ': ' + item.title,
    value: item.id
})),
```

Departments List

```js
choices: deplist.map(item => ({
    name: item.id + ': ' + item.department_name,
    value: item.id
})),
```

When Updating the Employees, the default Values are set to the origiinal values as a reminder of the values.

```js
default: (answers) => {
    const selectedEmployee = emplist.find(item => item.id === answers.select_emp);
    return selectedEmployee ? selectedEmployee.last_name : '';
},
```
### Connection Handler
**Department Database Connection**



**Roles Database Connection**


**Employees Database Connection**


## ScreenShots
<!-- ![Index img](./assets/screenshots/mainscreen.png)
![Emply note list img](./assets/screenshots/emptynotes.png)
![One Entry list img](./assets/screenshots/oneentrynotes.png) -->


## Video
<!--[![SVG Logo Generator Video](./assets/Images/video_preview.png)](https://1drv.ms/v/s!Asj9JhD05ulbsmX9vv-NrVazJf3s?e=akXML8)
 -->

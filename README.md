# Employee_Manager
12 Challenge

## Description


## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

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

When at the main menu the department is selected the function `department_prompt()` will handle the inquirer prompts for this section. Once finish making the decision within the menu it will resolve into a switch to decide which main option was selected and depending in which option the answers output will vary and stored in an object named `data` which then its passed as a patameter to the Department Database Handler this the connection instance and a string indicating the type decision was made.
```js
function department_prompt() {
    PersistentDB(db);
    inquirer.prompt(require('./utils/Controller/department.js')).then((answers) => {

        switch (answers.departments_op) {
            case 'View Departments':
                DepartmentDBHandler(db, 'get', null);
                department_prompt()
                break;
            case 'View Budget':
                data = {
                    id: answers.dep_select_bud
                };
                DepartmentDBHandler(db, 'getB', data);
                department_prompt()
                break;
            case 'Add Departments':
                data = {
                    name: answers.depname_add,
                };
                DepartmentDBHandler(db, 'add', data);
                department_prompt()
                break;
            case 'Update Departments':
                data = {
                    id: answers.dep_select_mod,
                    name: answers.depname_mod
                };
                DepartmentDBHandler(db, 'mod', data);
                department_prompt()
                break;
            case 'Delete Departments':
                data = { id: answers.dep_select_del };
                DepartmentDBHandler(db, 'del', data);
                department_prompt()
                break;
            case 'Clear All Departments':
                (answers.dep_confirm_del == 'Yes') ? (DepartmentDBHandler(db, 'delAll', null)) : false;
                department_prompt()
                break;
            case 'Go Back':
                startMenu();
                break;
        }
    });
}
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

When at the main menu the Roles is selected the function `roles_prompt()` will handle the inquirer prompts for this section. Once finish making the decision within the menu it will resolve into a switch to decide which main option was selected and depending in which option the answers output will vary and stored in an object named `data` which then its passed as a patameter to the Role Database Handler this the connection instance and a string indicating the type decision was made.
```js
function roles_prompt() {
    PersistentDB(db);
    inquirer.prompt(require('./utils/Controller/roles.js')).then((answers) => {
        switch (answers.roles_op) {
            case 'View Roles':
                data = {
                    sort: answers.view_sort,
                    order: answers.view_order,
                };
                RolesDBHandler(db, 'get', data);
                roles_prompt();
                break;
            case 'Add Roles':
                data = {
                    title: answers.title_add,
                    salary: answers.salary_add,
                    department_id: answers.dep_select_add
                };
                RolesDBHandler(db, 'add', data);
                roles_prompt();
                break;
            case 'Update Roles':
                data = {
                    id: answers.roles_mod,
                    title: answers.title_mod,
                    salary: answers.salary_mod,
                    department_id: answers.dep_select_mod
                };
                RolesDBHandler(db, 'mod', data);
                roles_prompt();
                break;
            case 'Delete Roles':
                data = { id: answers.role_select_del };
                RolesDBHandler(db, 'del', data);
                roles_prompt();
                break;
            case 'Clear All Roles':
                (answers.role_confirm_del == 'Yes') ? (RolesDBHandler(db, 'delAll', null)) : false;
                roles_prompt();
                break;
            case 'Go Back':
                startMenu();
                break;
        }
    });
}
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

When at the main menu the Roles is selected the function `employees_prompt()` will handle the inquirer prompts for this section. Once finish making the decision within the menu it will resolve into a switch to decide which main option was selected and depending in which option the answers output will vary and stored in an object named `data` which then its passed as a patameter to the Employees Database Handler this the connection instance and a string indicating the type decision was made.

```js
function employees_prompt() {
    PersistentDB(db);
    inquirer.prompt(require('./utils/Controller/employees')).then((answers) => {
        switch (answers.employees_op) {
            case 'View Employee':
                data = {
                    sort: answers.view_sort,
                    order: answers.view_order,
                    department: (answers.view_sort_dep) ? answers.view_sort_dep : null,
                    manager: (answers.view_sort_man) ? answers.view_sort_man : null
                };
                EmployeeDBHandler(db, 'get', data);
                employees_prompt();
                break;
            case 'Add Employee':
                data = {
                    name: answers.fname_add,
                    last: answers.lname_add,
                    role: answers.role_add,
                    manager: answers.manager_add
                };
                EmployeeDBHandler(db, 'add', data);
                employees_prompt();
                break;
            case 'Update Employee':
                data = {
                    id: answers.select_emp,
                    name: answers.fname_up,
                    last: answers.lname_up,
                    role: answers.role_up,
                    manager: answers.manager_up
                };
                EmployeeDBHandler(db, 'mod', data);
                employees_prompt();
                break;
            case 'Delete Employee':
                data = { id: answers.delete_emp };
                EmployeeDBHandler(db, 'del', data);
                employees_prompt();
                break;
            case 'Clear All Employees':
                (answers.confirm_del == 'Yes') ? (EmployeeDBHandler(db, 'delAll', null)) : false;
                employees_prompt();
                break;
            case 'Go Back':
                startMenu();
                break;
        }
    });
}
```

### Connection Handler
**Department Database Connection**

This is the `Department handler` function which takes care of the input and executes the corresponding sql query. depending on the type of answer the switch will handle differently every call, and redirect the flow into the correcto method. 
```js
function handler(db, type, data) {
    switch (type) {
        case 'add':
            addDepartment(db, data);
            break;
        case 'get':
            getDepartment(db)
            break;
        case 'getB':
            getDepartmentBudget(db, data)
            break;
        case 'mod':
            modDepartment(db, data)
            break;
        case 'del':
            delDepartment(db, data)
            break;
        case 'delAll':
            delAllDepartment(db)
            break;
        default: false
            break;
    }
}
module.exports = handler;
```

**`getDepartment(db)`**

This function recieves a db parameter, this has the connection instance, which will be used to connecto to the database and run the Query: `SELECT * from department;` and the result json will print as a table.
```js
function getDepartment(db) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = "SELECT * from department;";
        con.query(sqlQuery, (err, result, fields) => {
            console.log('\n');
            console.table(result);
            console.log('\n');
        });
    });
}
```

**`getDepartmentBudget(db, data)`**

This funtion recieves the db and data parameter, the db has the connection instance, and the data contains the answer data necessary to run the query with the wanted parameters. Using the query it selects a department_id, and sums every role salary with that department id.
It returns the result as a table.

```js
function getDepartmentBudget(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `SELECT d.department_name AS department, SUM(r.salary) AS total_budget FROM department d JOIN role r ON d.id = r.department_id JOIN employee e ON r.id = e.role_id WHERE d.id = ${data.id} GROUP BY d.department_name;`;
        con.query(sqlQuery, (err, result, fields) => {
            // console.log(result);
            // console.log(fields);
            // console.log(err);
            // CreateTable(result)

            console.log('\n');
            console.table(result);
            console.log('\n');
        });
    });
}
```

**`addDepartment(db, data)`**

This funtion recieves the db and data parameter, the db has the connection instance, and the data contains the Department information necessary to add a new Department using the query with the data content. 
Query: `INSERT INTO department (department_name) VALUES (?);`

```js
function addDepartment(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');
        const sqlQuery = `INSERT INTO department (department_name) VALUES ("${data.name}");`;
        con.query(sqlQuery, (err, results, fields) => {
            console.log('Creates Succesfully');
            con.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                    return;
                }
                // console.log('Database connection closed.');
            });
        });
    })
}
```

**`modDepartment(db, data)`**

This funtion recieves the db and data parameter, the db has the connection instance, and the data contains the answer data necessary to update the selected department. Using the query it gets the `id` and new `name` from the data.
Query: `UPDATE department SET department_name=?" WHERE id=?;`

```js
function modDepartment(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `UPDATE department SET department_name="${data.name}" WHERE id=${data.id};`;
        con.query(sqlQuery, (err, results, fields) => {
            console.log('Updated Succesfully');
            con.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                    return;
                }
                // console.log('Database connection closed.');
            });
        });
    })
}
```

**`delDepartment(db, data)`**

This funtion recieves the `db` and `data` parameter, the db has the connection instance, and the `data` contains the selected id data necessary to delete the row that meets the parameters.
Using the query it uses the department_id stored in the data variable and deletes the row.
Query: `DELETE FROM department WHERE id = ?;`

```js
function delDepartment(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM department WHERE id = ${data.id};`;
        con.query(sqlQuery, (err, result, fields) => {
            console.log(result);

        });
    });
} 
```

**`delAllDepartment(db)`**

This function recieves the db connection instance and deletes the entire table using the query: `DELETE FROM department`

```js
function delAllDepartment(db) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM department;`;
        con.query(sqlQuery, (err, result, fields) => {
            console.log(result)
        });
    });
} 
```
**Roles Database Connection**

This is the `Roles handler` function which takes care of the input and executes the corresponding sql query. depending on the type of answer the switch will handle differently every call, and redirect the flow into the correcto method. 

```js
function handler(db, type, data) {
    switch (type) {
        case 'add':
            addRoles(db, data);
            break;
        case 'get':
            getRoles(db, data)
            break;
        case 'mod':
            modRoles(db, data)
            break;
        case 'del':
            delRoles(db, data)
            break;
        case 'delAll':
            delAllRoles(db)
            break;
        default: false
            break;
    }
}
```
**`getRoles(db, data)`**


This function recieves the db connection instance and data containing the parameters for order and sorting the output.

```js
function getRoles(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        let sqlQuery =
            (data.sort = 'department_name')
                ? `SELECT role.title, role.salary, department.department_name FROM role JOIN department ON role.id = department.id ORDER BY department.${data.sort} ${data.order};`
                : `SELECT role.title, role.salary, department.department_name FROM role JOIN department ON role.id = department.id ORDER BY role.${data.sort} ${data.order};`;
        con.query(sqlQuery, (err, result, fields) => {
            console.log('\n');
            console.table(result);
            console.log('\n');
        });
    });
}
```

**`addRoles(db, data)`**

This function recieves the db connection instance and data containing the necessary information to insert into the table.

Query: `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`

```js
function addRoles(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');
        const sqlQuery = `INSERT INTO role (title, salary, department_id) VALUES ("${data.title}","${data.salary}",${data.role},${data.department_id})`;
        con.query(sqlQuery, (err, results, fields) => {
            console.log('Creates Succesfully');
            con.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                    return;
                }
            });
        });
    })
}
```

**`modRoles(db, data)`**

This function recieves the db connection instance and data containing the necessary information to modify an existing role from the table.
Query: `UPDATE role SET title=?, salary=?, department_id=? WHERE id=?`

```js
function modRoles(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        // console.log('Connected to the database.');
        const sqlQuery = `UPDATE role SET title="${data.title}", salary="${data.salary}", department_id=${data.department_id} WHERE id=${data.id}`;
        con.query(sqlQuery, (err, results, fields) => {
            console.log('Updated Succesfully');
            con.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                    return;
                }
            });
        });
    })
}
```

**`delRoles(db, data)`**

This funtion recieves the `db` and `data` parameter, the db has the connection instance, and the `data` contains the selected role id data necessary to delete the row that meets the parameters. 
Using the query it uses the role id stored in the data variable and deletes the row.
Query: `DELETE FROM role WHERE id = ?;`

```js
function delRoles(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM role WHERE id = ${data.id}`;
        con.query(sqlQuery, (err, result, fields) => {
            // console.log(result);
        });
    });
}
```
**`delAllRoles(db)`**

This function recieves the db connection instance and deletes the entire table using the query: `DELETE FROM role`

```js
function delAllRoles(db) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM role`;
        con.query(sqlQuery, (err, result, fields) => {
            // console.log(result);
        });
    });
}
```

**Employees Database Connection**

This is the `Employees handler` function which takes care of the input and executes the corresponding sql query. depending on the type of answer the switch will handle differently every call, and redirect the flow into the correcto method. 

```js
function handler(db, type, data) {
    switch (type) {
        case 'add':
            addEmployee(db, data);
            break;
        case 'get':
            getEmployee(db, data)
            break;
        case 'mod':
            modEmployee(db, data)
            break;
        case 'del':
            delEmployee(db, data)
            break;
        case 'delAll':
            delAllEmployee(db)
            break;
        default: false
            break;
    }
}
```

**`getEmployee(db, data)`**

This function recieves the db connection instance and data containing the parameters for order and sorting the output.
Depending on the sort value using a switch case, two variable will change values depedning in each case:
* If all employees is selected it will show all employees 
* If department is selected it will pass which department was selected, and filter out every employee not corresponding to that department.
* If manager was selected, it will pass which manager id was selected, and return every employee corresponding to the manager.

```js
function getEmployee(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        let sort;
        let filter = ' ';
        switch (data.sort) {
            case 'VAll':
                sort = 'e.id';
                break;
            case 'department':
                sort = 'e.first_name';
                filter = ` WHERE d.id = ${data.department} `;
                break; 
            case 'manager':
                sort = 'e.first_name';
                filter = ` WHERE m.id = ${data.manager} `;
                break;
        }

        const sqlQuery = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS "Employee Name", d.department_name AS "Department" , r.title AS "Roles", r.salary AS "Salary", CONCAT(m.first_name, ' ', m.last_name) AS "Manager" FROM employee e LEFT JOIN employee m ON e.manager_id = m.id JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id${filter}ORDER BY ${sort} ${data.order};`;
        con.query(sqlQuery, (err, result, fields) => {
            console.log('\n');
            console.table(result);
            console.log('\n');
        });
    });
}
```
**`addEmployee(db, data)`**

This function recieves the db connection instance and data containing the necessary information to insert the new employee into the table.

Query: `INSERT INTO employee (first_name, last_name, role_id, manager_id)  VALUES (?,?,?,?);`

```js
function addEmployee(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');
        const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.name}","${data.last}",${data.role},${data.manager})`;
        con.query(sqlQuery, (err, results, fields) => {
            console.log('Creates Succesfully');
            con.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                    return;
                }
                // console.log('Database connection closed.');
            });
        });
    })
}
```

**`modEmployee(db, data)`**

This function recieves the db connection instance and data containing the necessary information to modify an existing employee from the table.

Query: `UPDATE employee SET first_name=?, last_name=?, role_id=?, manager_id=? WHERE id=?`


```js
function modEmployee(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');
        const sqlQuery = `UPDATE employee SET first_name="${data.name}", last_name="${data.last}", role_id=${data.role}, manager_id=${data.manager} WHERE id=${data.id}`;
        con.query(sqlQuery, (err, results, fields) => {

            console.log('Updated Succesfully');

            con.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                    return;
                }
                // console.log('Database connection closed.');
            });
        });
    })
}
```

**`delEmployee(db, data)`**

This funtion recieves the `db` and `data` parameter, the db has the connection instance, and the `data` contains the selected employee id necessary to delete the row that meets the parameters. 
Using the query it uses the employee id stored in the data variable and deletes the row.
Query: `DELETE FROM employee WHERE id = ?;`


```js
function delEmployee(db, data) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM employee WHERE id = ${data.id}`;
        con.query(sqlQuery, (err, result, fields) => {
            // console.log(result);
        });
    });
}
```

**`delAllEmployee(db)`**

This function recieves the db connection instance and deletes the entire table using the query: `DELETE FROM employee`

```js
function delAllEmployee(db) {
    const con = db.db();
    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        const sqlQuery = `DELETE FROM employee`;
        con.query(sqlQuery, (err, result, fields) => {
            // console.log(result);
        });
    });
}
```
**Persistent Data**

The persistent_db is a script that constantly updates the lists for department, role and employee, this lists are use when making changes loads an updated list of the database state. This helps selecting a department or a role by name instad of id number, and everything else too, As to which employee is selected to update, delete, or to be manager.

The functionality of the script is using mysql and fs, it get the actual data from the database, and saves that data as a json in a .json file. These json files is accessed from the inquire questions.

```js
const mysql = require('mysql');
const fs = require('fs');

function init(db) {

    const con = db.db();
    const departmentQuery = 'SELECT * FROM department';
    const roleQuery = 'SELECT * FROM role';
    const employeeQuery = 'SELECT * FROM employee';

    con.query(departmentQuery, (error, departments) => {
        if (error) throw error;
        writeToFile('./utils/lib/jsonPersistence/departments.json', departments);
    });
    con.query(roleQuery, (error, roles) => {
        if (error) throw error;
        writeToFile('./utils/lib/jsonPersistence/roles.json', roles);
    });
    con.query(employeeQuery, (error, employees) => {
        if (error) throw error;
        writeToFile('./utils/lib/jsonPersistence/employees.json', employees);
    });
    con.end();
}

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content), (err) =>
        err ? true : false
    );
    
module.exports = init;
```

## ScreenShots
**Main Menu Screen**
![Main Menu img](./assets/screenshots/main_menu.PNG)

**Employees Menu Screen**
![Employees menu img](./assets/screenshots/employees_menu.PNG)

**Roles Menu Screen**
![Roles Menu img](./assets/screenshots/roles_menu.PNG) 

**Department Menu Screen**
![Department Menu img](./assets/screenshots/department_menu.PNG) 

## Video
<!--[![SVG Logo Generator Video](./assets/Images/video_preview.png)](https://1drv.ms/v/s!Asj9JhD05ulbsmX9vv-NrVazJf3s?e=akXML8)
 -->

USE business_db;

INSERT INTO department (department_name) VALUES
    ('Marketing'),
    ('Sales'),
    ('Finance'),
    ('Human Resources'),
    ('IT'),
    ('Operations'),
    ('Research and Development'),
    ('Customer Service');

INSERT INTO role (title, salary, department_id) VALUES
    ('Marketing Manager', 50000, 1),
    ('Sales Representative', 40000, 2),
    ('Financial Analyst', 60000, 3),
    ('HR Manager', 55000, 4),
    ('IT Specialist', 45000, 5),
    ('Operations Manager', 55000, 6),
    ('Research Analyst', 50000, 7),
    ('Customer Representative', 40000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Michael', 'Johnson', 3, 1),
    ('Emily', 'Davis', 4, NULL),
    ('David', 'Brown', 5, 3),
    ('Sarah', 'Wilson', 6, NULL),
    ('Robert', 'Taylor', 7, 6),
    ('Jennifer', 'Anderson', 8, 6);

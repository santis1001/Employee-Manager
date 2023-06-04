DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
manager_id INT,
FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

SELECT
  e.id AS employee_id,
  e.first_name AS employee_first_name,
  e.last_name AS employee_last_name,
  r.title AS employee_role,
  d.department_name AS role_department,
  m.first_name AS manager_first_name,
  m.last_name AS manager_last_name
FROM
  employee e
LEFT JOIN
  employee m ON e.manager_id = m.id
JOIN
  role r ON e.role_id = r.id
JOIN
  department d ON r.department_id = d.id
WHERE
  e.manager_id = 2 
ORDER BY
  e.last_name ASC;

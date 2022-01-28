DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  jobtitle VARCHAR(30) NOT NULL,
  salary INT NOT NULL,
  department INT,
  FOREIGN KEY (department)
  REFERENCES department(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  jobtitle VARCHAR(30) NOT NULL,
  department INT,
  salary INT NOT NULL,
  managers VARCHAR(30),
  FOREIGN KEY (department) REFERENCES department(id),
  FOREIGN KEY (jobtitle) REFERENCES roles(id),
  FOREIGN KEY (salary) REFERENCES roles(id)
);
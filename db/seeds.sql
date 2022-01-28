INSERT INTO department (name)
VALUES ("Sales"),
        ("Production"),
        ("Accounting");

INSERT INTO roles (jobtitle, salary, department)
VALUES ("Salesman", 60000, 1),
       ("Technician", 40000, 2),
       ("Accountant", 60000, 3);

INSERT INTO employees (firstname, lastname, jobtitle, department, salary, managers)
VALUES ("Stacy", "Smith",  1, 1, 1, "Hans"),
       ("Tommy", "Twinky", 2, 2, 2, "Abe"),
       ("Anna", "Ericksen", 3, 3, 3, "Hans");
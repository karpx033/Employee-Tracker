const inquirer = require('inquirer');

 function loadPrompts() {
     inquirer
    .prompt([
    {
     type: "list",
     name: "choice",
     message: "Make a selection",
     choices: ['View all departments', 'View all roles','View all employees', 'Add a department','Add a role','Add an employee','Update an employee role'],
     default: 'View all roles'
    }
 ]).then(answers => {
     console.info('Answer:', answers.choice);
     switch (answers.choice) {
        case "View all departments":
            viewDepartments();
            break;
        case "View all roles":
            viewRoles();
            break;
        case "View all employees":
            viewEmployees();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Update an employee role":
            updateEmployee();
            break;
        default:
            console.log(err);
        }
    });
};

loadPrompts();

function viewDepartments () {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
      });
}

function viewRoles () {
    db.query('SELECT * FROM roles', function (err, results) {
        console.log(results);
      });
}

function viewEmployees () {
    db.query('SELECT * FROM employees', function (err, results) {
        console.log(results);
      });
}

function addDepartment () {

}

function addRole () {

}

function addEmployee () {

}

function updateEmployee () {

}

module.exports = {viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee};
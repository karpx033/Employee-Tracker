const inquirer = require('inquirer');
const db = require('./config/connection');
const cTable = require('console.table');

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
        console.table(results);
      });
}

function viewRoles () {
    db.query(`SELECT roles.jobtitle AS jobtitle, roles.salary AS salary, department.name AS department
        FROM roles
        JOIN department ON roles.department = department.id;`, 
        function (err, results) {
        console.table(results);
      });
}

function viewEmployees () {
    db.query( `SELECT e.firstname AS firstname, e.lastname AS lastname, roles.jobtitle AS jobtitle, department.name AS department, roles.salary AS salary, e.managers AS managers
    FROM employees e
    JOIN department ON e.department = department.id
    JOIN roles r ON e.jobtitle = r.id
    JOIN roles  ON e.salary = roles.id;`, function (err, results) {
        console.table(results);
      });
}

function addDepartment () {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?",
           }
    ]).then((answers) => {
        var dname = answers.department;
        db.query(`INSERT INTO department (name)
        VALUES ("${dname}");`, function (err, results){
            console.table(results);
        })
    })
};

function addRole () {
    inquirer.prompt([
        {
            type: "input",
            name: "jobtitle",
            message: "What is the job title of the role?",
    },
    {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
    },
    {
        type: "input",
        name: "department",
        message: "What is the of the role's department?",
}
]).then((answers) => {
    var jt = answers.jobtitle;
    var ss = answers.salary;
    var dd = answers.department;
    db.query(`INSERT INTO roles (jobtitle, salary, department)
    VALUES ("${jt}", ${ss}, ${dd}),`, function (err, results){
        console.table(results);
    })
})
};

function addEmployee () {
    inquirer.prompt([
        {
            type: "input",
            name: "fn",
            message: "What is the first name of the employee?",
    },
    {
            type: "input",
            name: "ln",
            message: "What is the last name of the employee?",
    },
    {
        type: "input",
        name: "rl",
        message: "What is the id of the employee's role?",
    },
    {
        type: "input",
        name: "mng",
        message: "Who is the employee's manager?",
    }
]).then((answers) => {
    var fn = answers.fn;
    var ln = answers.ln;
    var rl = answers.rl;
    var mng =answers.mng;
    db.query(`INSERT INTO employees (firstname, lastname, jobtitle, department, salary, managers)
    VALUES ("${fn}", "${ln}",  ${rl}, ${rl}, ${rl}, "${mng}),`, function (err, results){
        console.table(results);
    })
})
}
var onlynames =[];
function updateEmployee () {
    db.query(`SELECT employees.firstname from employees;`, 
        function (err, results) {
            var names = results;
            
            for (let i=0; i<names.length; i++) {
                onlynames.push(names[i].firstname)
            }
            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "emp",
                                    message: "What is the first name of the employee?",
                                    choices: onlynames,
                            },
                            {
                                type: "input",
                                name: "role",
                                message: "What is their new role ID?"
                            }
                        ])
                        .then((answers) => {
                        var emp =answers.emp
                        var role = answers.role
                        db.query(`UPDATE employees
                        SET jobtitle = "${role}"
                        WHERE firstname = '${emp}';`, function (err, results) {
                        })
                        db.query(`SELECT * FROM employees`, function (err, empresutls){
                            console.table(empresutls);
                        })
                    });
    }) 
};

module.exports = {viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee};
const inquirer = require('inquirer');
const db = require('./config/connection');
const cTable = require('console.table');
const { load } = require('dotenv');

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
        loadPrompts();
      });
}

function viewRoles () {
    db.query(`SELECT roles.jobtitle AS jobtitle, roles.salary AS salary, department.name AS department
        FROM roles
        JOIN department ON roles.department = department.id;`, 
        function (err, results) {
        console.table(results);
        loadPrompts();
      });
}

function viewEmployees () {
    db.query( `SELECT employees.firstname AS firstname, employees.lastname AS lastname, roles.jobtitle AS jobtitle, department.name AS department, roles.salary AS salary, employees.managers AS managers
    FROM employees , roles, department
    WHERE employees.jobtitle=roles.id AND employees.department = department.id;`, function (err, results) {
        console.table(results);
        loadPrompts();
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
            loadPrompts();
        })
    })
};

function addRole () {
    var deparr =[];
    db.query(`SELECT department.name from department;`, function (err, results) {
        
        var departments = results;
        for (let i=0; i<departments.length; i++) {
            deparr.push(departments[i].name)
        }
    })
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
        type: "list",
        name: "department",
        message: "Which is the of the role's department?",
        choices: deparr
}
]).then((answers) => {
    var jt = answers.jobtitle;
    var ss = answers.salary;
    var dd = answers.department;
    var indexdd = deparr.indexOf(dd)
    indexdd +=1;
    db.query(`INSERT INTO roles (jobtitle, salary, department)
    VALUES ("${jt}", ${ss}, ${indexdd})`, function (err, results){
        loadPrompts();
    })
})
};

function addEmployee () {
    var jobsarr = [];
    db.query(`SELECT roles.jobtitle from roles;`, function (err, results) {
        
        var jobs = results;
        for (let i=0; i<jobs.length; i++) {
            jobsarr.push(jobs[i].jobtitle)
        }
    })
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
        type: "list",
        name: "rl",
        message: "What is the employee's role?",
        choices: jobsarr
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
    var indexrole = jobsarr.indexOf(rl)
    indexrole +=1;
    var mng =answers.mng;
 
    db.query(`INSERT INTO employees (firstname, lastname, jobtitle, department, salary, managers)
    VALUES ("${fn}", "${ln}",  ${indexrole}, ${indexrole}, ${indexrole}, "${mng}")`, function (err, results){
        loadPrompts();
    })
})
}

function updateEmployee () {
    var onlynames =[];
    var jobsarr = [];
    db.query(`SELECT employees.firstname from employees;`, 
        function (err, results) {
            var names = results;
            
            for (let i=0; i<names.length; i++) {
                onlynames.push(names[i].firstname)
            }
    db.query(`SELECT roles.jobtitle from roles;`, function (err, results) {
        
        var jobs = results;
        for (let i=0; i<jobs.length; i++) {
            jobsarr.push(jobs[i].jobtitle)
        }
    })
            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "emp",
                                    message: "What is the first name of the employee?",
                                    choices: onlynames,
                            },
                            {
                                type: "list",
                                name: "role",
                                message: "What is their new role?",
                                choices: jobsarr
                            }
                        ])
                        .then((answers) => {
                        var emp =answers.emp
                        var role = answers.role
                        var indexval = jobsarr.indexOf(role);
                        indexval +=1;
                        db.query(`UPDATE employees
                        SET jobtitle = ${indexval}, department = ${indexval}, salary = ${indexval}
                        WHERE firstname = "${emp}";`, function (err, results) {
                        })
                        loadPrompts();
                    });
    }) 
};
module.exports = {viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee};
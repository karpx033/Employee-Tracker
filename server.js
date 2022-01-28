const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');

const express = require('express');
const sequelize = require('./config/connection');

const models = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

function init() {
    inquirer.prompt([
   {
    type: "list",
    name: "name",
    message: "Make a selection",
    choices: ['View all roles',
    'View all employees', 
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role'],
    default: 'View all roles'
   },
])
   .then((answers) => {
       console.log(answers);
        if (answers.name==="View all roles") {
            viewRoles(answers);
        } if (answers.name==="View all employees") {
            viewEmployees(answers);
        } if (answers.name==="Add a department") {
            addDepartment(answers);
        } if (answers.name==="Add a role") {
            addRole(answers);
        } if (answers.name==="Add an employee") {
            addEmployee(answers);
        } if (answers.name==="Update an employee role") {
            updateEmployee(answers);
        }
    })
    .catch(err => {
        console.log(err);
    })
};

init();

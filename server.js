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

function loadPrompts() {
   inquirer
   .prompt([
   {
    type: "list",
    name: "choice",
    message: "Make a selection",
    choices: ['View all roles','View all employees', 'Add a department','Add a role','Add an employee','Update an employee role']
    // default: 'View all roles'
   }
]).then(answers => {
    console.info('Answer:', answers.choice);
  });;
}

let launch = async function () {
    return await loadPrompts();
};

  launch().then((answers) => { 
      console.log("Hello");
        console.log(answers);
    });

 
//        console.log(answers);
//         if (answers.name==="View all roles") {
//            console.log("works here");
//             viewRoles(answers);
//         } if (answers.name==="View all employees") {
//             // viewEmployees(answers);
//             viewRoles(answers);

//         } if (answers.name==="Add a department") {
//             // addDepartment(answers);
//             viewRoles(answers);

//         } if (answers.name==="Add a role") {
//             // addRole(answers);
//             viewRoles(answers);

//         } if (answers.name==="Add an employee") {
//             // addEmployee(answers);
//             viewRoles(answers);

//         } if (answers.name==="Update an employee role") {
//             // updateEmployee(answers);
//             viewRoles(answers);

//         }
//     })
//     .catch(err => {
//         console.log(err);
//     })
// };

// function viewRoles (answers) {
//     console.log(answers);
//     console.log("working");
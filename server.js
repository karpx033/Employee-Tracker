const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const db = require('./db/connection.js');
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Hardcoded query: DELETE FROM course_names WHERE id = 3;

db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Query database
db.query('SELECT * FROM course_names', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});





async function loadLizard () {
    await inquirer
     .prompt([
       {
         type: 'list',
         name: 'reptile',
         message: 'Which is better?',
         choices: ['alligator', 'crocodile'],
       },
     ])
     .then(answers => {
       console.info('Answer:', answers.reptile);
       return answers.reptile;
     });
   }
   
   loadLizard();
// async function loadPrompts() {
//    await inquirer
//    .prompt([
//    {
//     type: "list",
//     name: "choice",
//     message: "Make a selection",
//     choices: ['View all roles','View all employees', 'Add a department','Add a role','Add an employee','Update an employee role'],
//     default: 'View all roles'
//    }
// ]).then(answers => {
//     console.info('Answer:', answers.choice);
//     return answers.choice;
//   });;
// }

// loadPrompts();

// let launch = async function () {
//     return await loadPrompts();
// };

//   launch().then((answers) => { 
//       console.log("Hello");
//         console.log(answers);
//     });

 
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
// //     console.log("working");

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

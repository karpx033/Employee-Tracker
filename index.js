const fs = require('fs');
const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
// const Intern = require("./lib/Intern");
// const Engineer = require('./lib/Engineer');
// const employee = require('./lib/Employee.js');
// const Manager = require('./lib/Manager.js');
// const genTeam = require('./src/page-template.js');
// const styles = require('./dist/style.css');

const team = [];

const internquestions = [
    'What is the name of the intern?',
    'What is their employee ID?',
    'What is their email address?',
    'What is their school?',
    'Would you like to add another engineer or intern, or are you finished?'
];

const engquestions = [
    'What is the name of the engineer?',
    'What is their employee ID?',
    'What is their email address?',
    'What is their GitHub username?',
    'Would you like to add another engineer or intern, or are you finished?'
];

function viewRoles() {
    inquirer.prompt([
        {
            type: "input",
            message: internquestions[0],
            name: "internname"
           },
           {
            type: "input",
            message: internquestions[1],
            name: "internid"
           },
           {
            type: "input",
            message: internquestions[2],
            name: "internaddress"
           },
           {
            type: "input",
            message: internquestions[3],
            name: "internschool"
           },
           {
            type: "list",
            message: internquestions[4],
            name: "internaddition",
            choices: ["Engineer", "Intern", "No, generate my team"]
           },
    ])
    .then((answers) => {
        var {internname, internid, internaddress, internschool, internaddition} = answers;
        const intern = new Intern(internname, internid, internaddress, internschool);
        team.push(intern);
        if (answers.internaddition==="Engineer"){
            getEngineer();
        } if (answers.internaddition==="Intern") {
            getIntern();
        } else {
            var fileName = 'Team Contacts';
            var data = team;
            var print = genTeam(data);
            writeToFile(fileName, print);
        }
    
    
    })
    .catch(err => {
        console.log(err);
    })

}

function getEngineer () {
    inquirer.prompt ([
        {
            type: "input",
            message: engquestions[0],
            name: "internname"
           },
           {
            type: "input",
            message: internquestions[1],
            name: "engid"
           },
           {
            type: "input",
            message: engquestions[2],
            name: "engaddress"
           },
           {
            type: "input",
            message: engquestions[3],
            name: "enggithub"
           },
           {
            type: "list",
            message: engquestions[4],
            name: "engaddition",
            choices: ["Engineer", "Intern", "No, generate my team"]
           },
    ])
    .then ((answers) =>{
        var {engname, engid, engaddress, enggithub, engaddition} = answers;
        const engineer = new Engineer(engname, engid, engaddress, enggithub);
        team.push(engineer);
        if (answers.engaddition==="Engineer"){
            getEngineer();
        } if (answers.engaddition==="Intern") {
            getIntern();
        } else {
            var fileName = 'Team Contacts';
            var data = team;
            var print = genTeam(data);
            writeToFile(fileName, print);
        }
    })
    .catch(err => {
        console.log(err);
    })
}


// TODO: Create a function to initialize app
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
            viewRoles();
        } if (answers.name==="View all employees") {
            viewEmployees();
        } if (answers.name==="Add a department") {
            addDepartment();
        } if (answers.name==="Add a role") {
            addRole();
        } if (answers.name==="Add an employee") {
            addEmployee();
        } if (answers.name==="Update an employee role") {
            updateEmployee();
        } else {
            var fileName = 'Team Contacts';
            var data = team;
            var print = genTeam(data);
            writeToFile(fileName, print);
        }
    })
    .catch(err => {
        console.log(err);
    })
};

// Function call to initialize app
init();

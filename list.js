const inquirer = require('inquirer');

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
const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');


const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: nameInput =>{
          if(nameInput){
            return true;
          }
          else{
            console.log('please! put something in!');
            return false;
          }
        }
      },
      {
          type: 'input',
          name: 'github',
          message: 'Enter your Github Username',
          validate: nameInput =>{
            if(nameInput){
              return true;
            }
            else{
              console.log('please! put something in!');
              return false;
            }
          }
      },
      {
          type: 'confirm',
          name: 'confirmAbout',
          message: 'provide some information about yourself?',
          default: true
         
      },
      {
        type: 'input',
        name: 'about',
        message: 'ok, do it',
        when: ({confirmAbout}) => {
          if (confirmAbout){
            return true;
          }
          else{
            return false;
          }
        }
      }
    ]);
  };


  
  const promptProject = portfolioData => {
    if(!portfolioData.projects){
    portfolioData.projects = [];
  };
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)'
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: nameInput =>{
          if(nameInput){
            return true;
          }
          else{
            console.log('please! put something in!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ]).then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};
  promptUser()
  
  .then(promptProject)
  .then(portfolioData => {
const pageHTML = generatePage(portfolioData);
// console.log(portfolioData)
fs.writeFile('./index.html', pageHTML, err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out index.html to see the output!');
});
});







// console.log(profileDataArgs);

// const printProfileData = profileDataArr => {
//     for(let i = 0; i< profileDataArgs.length; i += 1){
//         console.log(profileDataArr[i]);
//     }
//     console.log('=============');

//     //is the same as this...
//     profileDataArr.forEach(profileItem => console.log(profileItem));
//   };
  
//   printProfileData(profileDataArgs);
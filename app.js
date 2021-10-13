const generatePage = require('./src/page-template.js');


const fs = require('fs');


const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;



fs.writeFile('index.html', generatePage(name, github), err =>{
    if(err) throw new Error(err);

    console.log('portfolio complete! Check out index.html to see the output!')
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
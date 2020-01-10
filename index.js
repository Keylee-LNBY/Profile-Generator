//Prompt user with Questions
var inquirer = require("inquirer");

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "username"
        },
        {
            type: "list",
            message: "What is your favorite color?",
            choices: ['red', 'yellow', 'orange', 'green', 'blue', 'purple', 'pink', 'grey', 'black'],
            name: "color"
            
        },
    ]);

//Fetch GitHub user information
    //Connect to the GitHub API 
    //Throw error if the username is not found

//Generate pdf that opens in browser
    // //PDF must include:
        // Bio image that is pulled from GitHub
        // Users Location based off Google Location
        // Link to GitHub Profile 
        //Include # of
            // Public Repos 
            // Followers
            // Stared 
            // Following 

//Create themes based off favorite color option
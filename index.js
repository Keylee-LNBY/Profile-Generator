//Link require links
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

//Prompt user with Questions
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
    ])
    .then(function(response) {
        console.log(response.username);
        console.log(response.color);
        // return  `# GET /users/${response.username}`;
        // return  `curl -i http://api.github.com/users/${response.username}`;
    });

        
        //write a then function that Fetchs the response.username and inserts it in the GitHub API info
            //Pull User's Picture
            //Pull User's Name
            //Pull User's # of Repos
                // # GET /users/${response.username};
                // `curl -i https://api.github.com/users/${response.username}/repos`
            //Pull User's # of Followers
            //Pull User's # of Followed
            //Pull USer's # of Starred 
                // return `curl -i http://api.github.com/users/${response.username}`
        //write a function that pulls the User's location based off Google Maps



//Generate pdf that opens in browser

//Create themes based off favorite color option
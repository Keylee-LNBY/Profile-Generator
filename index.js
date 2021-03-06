// ======================================Variables & Required Data================================================== //
//Link require links
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const util = require('util');
const htmlAsync = util.promisify(fs.writeFile);

//Global Variables
let gitStar;
let usernameInput;
let colorInput;

//Styling Colors for PDFs
const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
};

// ================================================================================================= //
// ======================================Functions================================================== //
//Pulls the number of stars a GitHub user has
stars = (response) => {
    const queryUrlStar=`https://api.github.com/users/${response}/starred`;

    axios.get(queryUrlStar)
    .then((response) => {
        console.log(`gitStar = ${response.data.length}`);
        gitStar = response.data.length;
    }).catch((e) => {
        console.log(`ERROR`, e);
    }); 
};

//Pulls all additional gitHub Profile information needed & calls the generateHTML function to create the profile HTML
gitHub = (response) => {
    const queryUrl = `https://api.github.com/users/${response}?`;
    
    axios.get(queryUrl)
    .then((response) => {
        //Call data
        console.log(response.data);
        //Run data through the generateTHML function & wrtie the data info the HTML
        let pdf = generateHTML(response);
		htmlAsync(`${usernameInput}.html`, pdf).catch((e) => {
			console.log('ERROR', e);
		});
    }).catch((e) => {
        console.log(`ERROR`, e);
    });   
};

//Creates the layout for the HTML
generateHTML = (response) => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
            <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
            <title>${response.name}'s Profile</title>
            <style>
                @page {
                    margin: 0;
                }
                *,
                *::after,
                *::before {
                box-sizing: border-box;
                }
                html, body {
                padding: 0;
                margin: 0;
                }
                html, body, .wrapper {
                height: 100%;
                }
                .wrapper {
                background-color: ${colors[colorInput].wrapperBackground};
                padding-top: 100px;
                }
                body {
                background-color: white;
                -webkit-print-color-adjust: exact !important;
                font-family: 'Cabin', sans-serif;
                }
                main {
                background-color: #E9EDEE;
                height: auto;
                padding-top: 30px;
                }
                h1, h2, h3, h4, h5, h6 {
                font-family: 'BioRhyme', serif;
                margin: 0;
                }
                h1 {
                font-size: 3em;
                }
                h2 {
                font-size: 2.5em;
                }
                h3 {
                font-size: 2em;
                }
                h4 {
                font-size: 1.5em;
                }
                h5 {
                font-size: 1.3em;
                }
                h6 {
                font-size: 1.2em;
                }
                .photo-header {
                position: relative;
                margin: 0 auto;
                margin-bottom: -50px;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                background-color: ${colors[colorInput].headerBackground};
                color: ${colors[colorInput].headerColor};
                padding: 10px;
                width: 95%;
                border-radius: 6px;
                }
                .photo-header img {
                width: 250px;
                height: 250px;
                border-radius: 50%;
                object-fit: cover;
                margin-top: -75px;
                border: 6px solid ${colors[colorInput].photoBorderColor};
                box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                }
                .photo-header h1, .photo-header h2 {
                width: 100%;
                text-align: center;
                }
                .photo-header h1 {
                margin-top: 10px;
                }
                .links-nav {
                width: 100%;
                text-align: center;
                padding: 20px 0;
                font-size: 1.1em;
                }
                .nav-link {
                display: inline-block;
                margin: 5px 10px;
                }
                .workExp-date {
                font-style: italic;
                font-size: .7em;
                text-align: right;
                margin-top: 10px;
                }
                .container {
                padding: 50px;
                padding-left: 100px;
                padding-right: 100px;
                }

                .row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin-top: 20px;
                    margin-bottom: 20px;
                }

                .card {
                    padding: 20px;
                    border-radius: 6px;
                    background-color: ${colors[colorInput].headerBackground};
                    color: ${colors[colorInput].headerColor};
                    margin: 20px;
                }
                
                .col {
                flex: 1;
                text-align: center;
                }

                a, a:hover {
                text-decoration: none;
                color: inherit;
                font-weight: bold;
                }

                @media print { 
                body { 
                    zoom: .75; 
                } 
                }
            </style>
        </head>
        <body>
        <div class="wrapper">
           <div class="photo-header">
              <img src="${response.data.avatar_url}" alt="Photo of ${response.data.name}" />
              <h1>Hi!</h1>
              <h2>
              My name is ${response.data.name}!</h1>
              <h5>${response.data.company}</h5>
              <nav class="links-nav">
                 <a class="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/${response.data.location}"><i class="fas fa-location-arrow"></i> ${response.data.location}</a>
                 <a class="nav-link" target="_blank" rel="noopener noreferrer" href="${response.data.html_url}"><i class="fab fa-github-alt"></i> GitHub</a>
                <a class="nav-link" target="_blank" rel="noopener noreferrer" href="${response.data.blog}"><i class="fas fa-rss"></i> Website</a>
              </nav>
           </div>
           <main>
              <div class="container">
              <div class="row">
                 <div class="col">
                    <h3>${response.data.bio}</h3>
                 </div>
              </div>
                 <div class="row">
                  <div class="col">
                      <div class="card">
                        <h3>Public Repositories</h3>
                        <h4>${response.data.public_repos}</h4>
                      </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <h3>Followers</h3>
                      <h4>${response.data.followers}</h4>
                    </div>
                 </div>
                 </div>
                 <div class="row">
                 <div class="col">
                 <div class="card">
                    <h3>GitHub Stars</h3>
                    <h4>${gitStar}</h4>
                    </div>
                 </div>
                  <div class="col">
                  <div class="card">
                    <h3>Following</h3>
                    <h4>${response.data.following}</h4>
                    </div>
                 </div>
                 </div>
              </div>
           </main>
        </div>
     </body>
    </html>
        `
}

//

//Prompts User with Questions
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
            choices: ['green', 'blue', 'pink', 'red'],
            name: "color"  
        },
    ])	
    .then((response) => {
        //Define the Username & Color
        usernameInput = response.username;
        console.log(usernameInput);

        colorInput = response.color;
        console.log(colorInput);

        //Call functions
        stars(usernameInput);
        gitHub(usernameInput);
        
	});

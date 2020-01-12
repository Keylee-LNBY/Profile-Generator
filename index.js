//Link require links
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
const util = require("util");

const htmlAsyn = util.promisify(fs.writeFile);


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
            choices: ['green', 'blue', 'pink', 'red'],
            name: "color"  
        },
    ])
    .then(function (response) {
        console.log(response);
        const colors = {
            'green': {
              wrapperBackground: "#E6E1C3",
              headerBackground: "#C1C72C",
              headerColor: "black",
              photoBorderColor: "#black"
            },
            'blue': {
              wrapperBackground: "#5F64D3",
              headerBackground: "#26175A",
              headerColor: "white",
              photoBorderColor: "#73448C"
            },
            'pink': {
              wrapperBackground: "#879CDF",
              headerBackground: "#FF8374",
              headerColor: "white",
              photoBorderColor: "#FEE24C"
            },
            'red': {
              wrapperBackground: "#DE9967",
              headerBackground: "#870603",
              headerColor: "white",
              photoBorderColor: "white"
            }
        };
        gitHub(response.username);
    });

    function stared(usernameStar) {
        const queryUrlStar=`https://api.github.com/users/${usernameStar}/starred`;
    
        axios.get(queryUrlStar)
            .then(function(responseStar) {
                console.log(`Stared: ${responseStar.data.length}`);
                let gitStar = `$responseStar.data.length`;
            })
    }
    //end of asking color question in Terminal
    function gitHub(usernameGit) {
        const queryUrl = `https://api.github.com/users/${usernameGit}?`;
    
        axios.get(queryUrl)
            .then(function (response) {
                stared(response.username);
                console.log(response.data);
            
            
        fs.writeFileSync(`${response.username}.html`, generateHTML(response));
            const options = { format: 'Letter', timeout: 30000 };
            const filename = "./" + res.data.login;
            const html = fs.readFileSync(filename + ".html", "utf8");

            pdf.create(html, options).toFile(filename + ".pdf", function (err, res) {
                if (err) return console.log(err);
                console.log("Success!!! Here is your file, make sure to check the HTML version as well!  " + res.filename);
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    } 

    // let chosenColor = colors.`${response.color}`
  
function generateHTML(response) {
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
                background-color: ${colors[response.color].wrapperBackground};
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
                background-color: ${colors[response.color].headerBackground};
                color: ${colors[response.color].headerColor};
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
                border: 6px solid ${colors[response.color].photoBorderColor};
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
                    background-color: ${colors[response.color].headerBackground};
                    color: ${colors[response.color].headerColor};
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
            <header class = "wrapper">
                <div class = "photo-header">
                    <div class = "row">
                        <img src="${response.avatar_id}">
                    </div>
                    <div class="row">
                        <h1>Hello!</h1>
                    </div>
                    <div class="row">
                        <h2>My name is ${response.name}!</h2>
                    </div>
                    <div class="row">
                        <h5>Currently at ${response.company}</h5>
                    </div>
                    <div class="links-nav">
                        <div class="nav-link">
                            <i class="fas fa-location-arrow"></i>
                            ${response.location}
                        </div>     
                        <div class="nav-link">
                            <i class="fab fa-github-alt"></i>
                            <a href="${response.html_url}">GitHub</a>
                        </div>
                        <div>
                            <i class="fas fa-rss"></i>
                            <a href="${response.blog}">Website</a>"
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div class="row">
                    <h3>${response.bio}</h3>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <h3>Public Repositories</h3>
                            <h4>${response.public_repos}</h4>
                        </div>
                        <div class="card">
                            <h3>GitHub Stars</h3>
                            <h4>${response.gitStar}</h4> 
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <h3>Following</h3>
                            <h4>${response.following}</h4>
                        </div>
                        <div class="card">
                            <h3>Followers</h3>
                            <h4>${response.followers}</h4>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="wrapper">

            </footer>
        </body>
    </html>
        `
            }


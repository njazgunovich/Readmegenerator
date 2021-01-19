const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");

function generate(data, github) {
    return `# **${data.title}**

${data.badge}

## Table of contents

- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Licence](#Licence)
- [Contributors](#Contributors)
- [Test](#Test)
- [Repository Link](#Repository)
- [GitHub Info](#GitHub)

## Description

${data.description}

## Installation

${data.installation}

## Usage

${data.usage}

## Licence

![](https://img.shields.io/badge/License-${data.license}-<orange>)

## Contribtors

${data.contributing }

##  Test

${data.test }

## Username

${data.username }

## Repo

${data.repo }


## GitHub

![Image of me](${github.githubImage})

- ${github.name}

- [GitHub Profile](${github.profile})

- <${github.email}>
`;
}

const questions = [{
        type: "input",
        name: "title",
        message: "What is your project title?"
    },
    {
        type: "input",
        name: "badge",
        message: "Please provide the badges links that you want"
    },
    {
        type: "input",
        name: "description",
        message: "Please provide your project's description"
    },
    {
        type: "input",
        name: "installation",
        message: "Please provide the installation instructions"
    },
    {
        type: "input",
        name: "usage",
        message: "Please provide the project usage"
    },
    {
        type: "list",
        name: "license",
        choices: ["MIT", "APACHE2.0", "GPLv3", "None"],
        message: "Please choose the project licence you want to use?"
    },

    {


        type: "input",
        name: "contributing",
        message: "Please provide the contributing parties"
    },
    {
        type: "input",
        name: "test",
        message: "Please provide the project tests"
    },
    {
        type: "input",
        name: "username",
        message: "What is your github user name?"
    },
    {
        type: "input",
        name: "repo",
        message: "What is your repo link?"
    },
];

inquirer
    .prompt(questions)
    .then(function(data) {
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios.get(queryUrl).then(function(res) {

            const githubInfo = {
                githubImage: res.data.avatar_url,
                email: res.data.email,
                profile: res.data.html_url,
                name: res.data.name
            };

            fs.writeFile("README.md", generate(data, githubInfo), function(err) {
                if (err) {
                    throw err;
                };

                console.log("New README file created with success!");
            });
        });

    });

function init() {

}

init();
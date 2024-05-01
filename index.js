const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');
const SVG = require('./lib/svg');

function promptUser() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Enter up to three characters for the text:',
                validate: (input) => {
                    return input.length <= 3 ? true : 'Text must be up to three characters long';
                }
            },
            {
                type: 'input',
                name: 'textColor',
                message: 'Enter the text color (color keyword or hexadecimal number):',
            },
            {
                type: 'list',
                name: 'shape',
                message: 'Choose a shape:',
                choices: ['Circle', 'Triangle', 'Square'],
            },
            {
                type: 'input',
                name: 'shapeColor',
                message: 'Enter the shape color (color keyword or hexadecimal number):',
            }
        ])
        .then(answers =>{
            resolve(answers);
        })
        .catch(error => {
            reject(error);
        })
    })
}

function generateSVG(text, textColor, shape, shapeColor) {
    const svg = new SVG();

    console.log('Shape:', shape); // For Debugging

    let shapeObj;

    switch (shape){
        case 'Circle':
            shapeObj = new Circle();
        break;
        case 'Triangle':
            shapeObj = new Triangle();
        break;
        case 'Square':
            shapeObj = new Square();
        break;
        default:
            throw new Error ('Invalid Shape');
    }

    shapeObj.setColor(shapeColor);
    svg.setText(text, textColor);
    svg.setShape(shapeObj);
    
    const svgMarkup = svg.render();

    fs.writeFile('./examples/logo.svg', svgMarkup, (err) => {
        if (err) {
            console.log('Error writing file:', err);
            return;
        }
        console.log('Generated logo.svg');
    });
}

promptUser().then(answers => {
    generateSVG(answers.text, answers.textColor, answers.shape, answers.shapeColor);
})
.catch(error => {
    console.log('An error occurred:', error);
})
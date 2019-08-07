const inquirer = require('inquirer');
const cloneTemplate = require('./cloneTemplate');
const templatesMap = require('./templatesMap');

const selectTemplate = projectName => {
    return inquirer.prompt([{
        type: 'list',
        message: 'Please select the template you want:',
        name: 'template',
        choices: Object.keys(templatesMap)
    }]).then(answers => {
        const templateUrl = templatesMap[answers.template].url;
        cloneTemplate(templateUrl, projectName);
    })
};

module.exports = selectTemplate;
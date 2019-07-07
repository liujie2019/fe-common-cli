const download = require('download-git-repo');
const inquirer = require('inquirer');
const fs = require('fs');
const handlebars = require('handlebars');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');

const cloneTemplate = templateUrl => {
    // templateUrl为模板路径
    // projectName项目名称
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: '请输入项目名称'
        }, {
            type: 'input',
            name: 'description',
            message: '请输入项目描述'
        }, {
            type: 'input',
            name: 'author',
            message: '请输入项目作者名称'
        }
    ]).then(answers => {
        const spinner = ora('正在下载模板...');
        spinner.start();
        const {name} = answers;
        download(templateUrl, name, {clone: true}, err => {
            if (err) {
                spinner.fail();
                console.log(symbols.error, chalk.red('下载模板失败'));
                return;
            }
            spinner.succeed();
            const fileName = `${name}/package.json`;
            // 同步读取项目目录下的package.json文件内容
            const content = fs.readFileSync(fileName).toString();
            // 使用模板引擎把用户输入的数据解析到package.json文件中
            const result = handlebars.compile(content)(answers);
            // 使用node的文件模块fs，将handlebars渲染完后的模板重新写入到package.json文件中
            fs.writeFileSync(fileName, result);
            console.log(symbols.success, chalk.green('下载模板成功'));
        });
    });
};

module.exports = cloneTemplate;

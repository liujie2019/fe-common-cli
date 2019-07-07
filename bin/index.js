#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const selectTemplate = require('../selectTemplate');
const templatesMap = require('../templatesMap');

// console.log(chalk.green('Cli start'));
program
  .version(require('../package').version, '-V, --version')

program
    .command('init') // 指定命令名称
    // .command('init <templateName> <projectName>') // 指定命令名称
    .alias('i') // 命令别名
    .description('初始化项目模板') // 命令描述
    .action(() => {
        // 根据模板名称下载对应的模板到本地并起名为变量projectName
        // console.log(projectName);
        selectTemplate();
    });
program
    .command('list')
    .alias('ls') // 命令别名
    .description('查看所有可用模板') // 命令描述
    .action(() => {
        for (let key in templatesMap) {
            console.log(`
                ${key} ${templatesMap[key].description}
            `);
        }
    });

// process.argv是nodejs中原生用来获取命令行参数的方法
program.parse(process.argv)
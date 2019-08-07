#!/usr/bin/env node
const program = require('commander');
const selectTemplate = require('../selectTemplate');
const templatesMap = require('../templatesMap');
const fs = require('fs');

program
  .version(require('../package').version, '-V, --version')

program
    .command('init <projectName>') // 指定命令名称
    // .command('init <templateName> <projectName>') // 指定命令名称
    .alias('i') // 命令别名
    .description('初始化项目模板') // 命令描述
    .action(projectName => {
        if (!fs.existsSync(projectName)) {
            // 根据模板名称下载对应的模板到本地并起名为变量projectName
            selectTemplate(projectName);
        }
        else{
            // 错误提示项目已存在，避免覆盖原有项目
            console.log(symbols.error, chalk.red('项目已存在'));
        }
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
program.parse(process.argv);

// program.version('1.0.0', '-V, --version')
//     .command('init <name>')
//     .action(name => {
//         if (!fs.existsSync(name)) {
//             inquirer.prompt([
//                 {
//                     name: 'description',
//                     message: '请输入项目描述'
//                 },
//                 {
//                     name: 'author',
//                     message: '请输入作者名称'
//                 }
//             ]).then(answers => {
//                 const spinner = ora('正在下载模板，请稍等...');
//                 spinner.start();
//                 child_process.exec(`git clone ssh://liujie26@icode.baidu.com:8235/baidu/bce-console/console-cnap`, (err, stdout, stderr) => {
//                     if (err) {
//                         spinner.fail();
//                         console.log(symbols.error, chalk.red(err));
//                         // console.log(chalk.red('Err: ' + err));
//                         return;
//                     }
//                     spinner.succeed();
//                     const meta = {
//                         name,
//                         description: answers.description,
//                         author: answers.author
//                     };
//                     const fileName = `${name}/package.json`;
//                     if (fs.existsSync(fileName)) {
//                         const content = fs.readFileSync(fileName).toString();
//                         const result = handlebars.compile(content)(meta);
//                         fs.writeFileSync(fileName, result);
//                     }
//                     console.log(symbols.success, chalk.green('项目初始化完成'));
//                     // console.log(chalk.green('init success'));
//                 });
//             });
//         }
//         else{
//             // 错误提示项目已存在，避免覆盖原有项目
//             console.log(symbols.error, chalk.red('项目已存在'));
//         }
//     });

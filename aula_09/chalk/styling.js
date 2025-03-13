// const chalk = require('chalk');
import chalk from "chalk"

console.log(chalk.blue('Hello, blue world!!!'))
console.log(chalk.red('Erro'))
console.log(chalk.red.inverse('Erro'))
console.log(chalk.bgRed('Erro'))
console.log(chalk.bgYellow.bold('Warning!'))
console.log(chalk.green.bold('Success!'))
console.log(chalk.green.underline.bold('Success!'))
console.log(chalk.green.reset.bold('Success!'))
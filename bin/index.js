#! /usr/bin/env node

const { chalk } = require('../libs/tools/module')
const init = require('../libs/command/init')

console.log(chalk.yellowBright.bold(`👏 welcome to use command-enhanced 👏`))

// 初始化项目，将shell目录下文件复制到用户的指定目录下
init()
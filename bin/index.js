#! /usr/bin/env node

const { chalk } = require('../libs/tools/module')
const init = require('../libs/command/init')

console.log(chalk.yellowBright.bold(`ð welcome to use command-enhanced ð`))

// åå§åé¡¹ç®ï¼å°shellç®å½ä¸æä»¶å¤å¶å°ç¨æ·çæå®ç®å½ä¸
init()
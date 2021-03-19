// 控制台交互

const repl = require('repl');
const msg = 'message';

repl.start('> ').context.m = msg;
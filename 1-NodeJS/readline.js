const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 提问回答
rl.question('This is question', (answer) => {
  console.log(`This is answer: ${answer}`);
  rl.close();
});

// 命令行输入
// rl.on('line', (input) => {
//     console.log(`Received: ${input}`);
// });

// 监听键盘输入
// process.stdin.on('keypress', (c, k) => {
//     console.log(rl.line);
// });
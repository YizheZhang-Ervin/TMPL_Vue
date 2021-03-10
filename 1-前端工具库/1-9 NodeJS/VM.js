// 虚拟执行环境
const vm = require('vm');

let test1 = ()=>{
    const x = 1;
    const context = { x: 2 };
    vm.createContext(context); // 上下文隔离化对象。

    const code = 'x += 40; var y = 17;';
    // `x` and `y` 是上下文中的全局变量。
    // 最初，x 的值为 2，因为这是 context.x 的值。
    vm.runInContext(code, context);

    console.log(context.x); // 42
    console.log(context.y); // 17

    console.log(x); // 1; y 没有定义。
}

// 创建一个可以被 Script 构造函数中 cachedData 选项使用的代码缓存。返回 Buffer。可以在任何时候不限次数地调用该方法。
let test2 =()=>{
    const script = new vm.Script(`
    function add(a, b) {
    return a + b;
    }
    const x = add(1, 2);
    `);

    const cacheWithoutX = script.createCachedData();
    script.runInThisContext();
    const cacheWithX = script.createCachedData();
}

// 递增一个全局变量，给另外一个全局变量赋值。同时该代码被编译后会被多次执行。全局变量会被置于 context 对象内
let test3 = ()=>{
    const context = {
    animal: 'cat',
    count: 2
    };

    const script = new vm.Script('count += 1; name = "kitty";');

    vm.createContext(context);
    for (let i = 0; i < 10; ++i) {
    script.runInContext(context);
    }

    console.log(context);
    // 打印: { animal: 'cat', count: 12, name: 'kitty' }
}


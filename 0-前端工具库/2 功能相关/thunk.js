// Thunk函数实现（结合Generator实现异步）
// 可以用于 Generator 函数的自动流程管理
// yield 命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给 Generator 函数
// 这种方法就是 Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数

var fs = require('fs');

var Thunk = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function (callback) {
            args.push(callback);
            return fn.apply(this, args);
        }
    };
};

// 使用方式
// Thunk(fs.readFile)(fileName)(callback);

function run(fn) {
    var gen = fn();
    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}

var gen = function* () {
    var f1 = yield readFile('apply.js');
    console.log(f1);
    var f2 = yield readFile('bind.js');
    var fn = yield readFile('call.js');
};

// 使用方式
var readFile = Thunk(fs.readFile);
run(gen);
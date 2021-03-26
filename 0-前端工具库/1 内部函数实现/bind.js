// 方法1
function call(Fn,obj,...args){
    if(obj===undefined || obj===null){
        obj = globalThis;
    }
    obj.temp = Fn;
    let result = obj.temp(...args);
    delete obj.temp;
    return result;
}

function bind(Fn,obj,...args){
    return function(...args2){
        // bind传的参靠前，调用传的参靠后，会优先执行前面的参数
        return call(Fn,obj,...args,...args2);
    }
}

// 方法2
// bind实现
let bind2 = (Fn,obj,...args1)=>{
    // 返回的是函数
    return (...args2)=>{
        // obj没定义则指向全局
        if(obj==undefined || obj==null){
            obj = globalThis;
        }
        // 把绑定的函数作为对象的方法
        obj.temp = Fn;
        // 执行得结果
        let rst = obj.temp(...[...args1,...args2]);
        // 删除对象得方法
        delete obj.temp;
        // 返回结果
        return rst;
    }
}



// test
function add(a,b){
    return a+b+this.c;
}
let obj={c:30};
globalThis.c = 40;

let b1 = bind(add,obj,10,20);
console.log(b1());
let b2 = bind(add,obj)
console.log(b2(10,20));

// test2
let fn = function(...args){console.log(args)};
bind2(fn,this,1)(2);
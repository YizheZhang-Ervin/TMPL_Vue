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

// 测试
function add(a,b){
    return a+b+this.c;
}
let obj={c:30};
globalThis.c = 40;

let b1 = bind(add,obj,10,20);
console.log(b1());
let b2 = bind(add,obj)
console.log(b2(10,20));